// backend/server.ts
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Types
interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  high52Week?: number;
  low52Week?: number;
}

interface EmailRequest {
  email: string;
  selectedStocks: string[];
  profile: 'safe' | 'moderate' | 'aggressive';
}

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_APP_PASSWORD, // App password (not regular password)
    },
  });
};

// Alpha Vantage API functions
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || '49ONGUL8C0MHQFG8';

const fetchStockQuote = async (symbol: string): Promise<StockData | null> => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const quote = response.data['Global Quote'];
    if (!quote || Object.keys(quote).length === 0) {
      console.log(`No data found for symbol: ${symbol}`);
      return null;
    }

    return {
      symbol: quote['01. symbol'],
      name: symbol, // Alpha Vantage doesn't provide company name in quote
      currentPrice: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
    };
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
};

const fetchStockOverview = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const overview = response.data;
    if (!overview || Object.keys(overview).length === 0) {
      return null;
    }

    return {
      name: overview.Name,
      marketCap: overview.MarketCapitalization ? parseInt(overview.MarketCapitalization) : null,
      peRatio: overview.PERatio ? parseFloat(overview.PERatio) : null,
      dividendYield: overview.DividendYield ? parseFloat(overview.DividendYield) * 100 : null,
      high52Week: overview['52WeekHigh'] ? parseFloat(overview['52WeekHigh']) : null,
      low52Week: overview['52WeekLow'] ? parseFloat(overview['52WeekLow']) : null,
    };
  } catch (error) {
    console.error(`Error fetching overview for ${symbol}:`, error);
    return null;
  }
};

const getCompleteStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    const [quote, overview] = await Promise.all([
      fetchStockQuote(symbol),
      fetchStockOverview(symbol)
    ]);

    if (!quote) return null;

    return {
      ...quote,
      name: overview?.name || quote.name,
      marketCap: overview?.marketCap,
      peRatio: overview?.peRatio,
      dividendYield: overview?.dividendYield,
      high52Week: overview?.high52Week,
      low52Week: overview?.low52Week,
    };
  } catch (error) {
    console.error(`Error getting complete data for ${symbol}:`, error);
    return null;
  }
};

// Email template generator
const generateEmailTemplate = (
  stocksData: StockData[], 
  profile: string,
  selectedStocks: string[]
): string => {
  const profileTitles = {
    safe: 'Conservative Investment Portfolio',
    moderate: 'Balanced Investment Portfolio', 
    aggressive: 'Growth-Oriented Investment Portfolio'
  };

  const profileDescriptions = {
    safe: 'Focus on stable, dividend-paying stocks with lower volatility.',
    moderate: 'Balance between growth potential and stability.',
    aggressive: 'High-growth potential stocks with higher risk tolerance.'
  };

  let emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #ffffff;
      color: #1a1a1a;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .header {
      background-color: #004080;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 28px;
    }

    .header p {
      margin: 5px 0 0;
      font-size: 16px;
    }

    .content {
      padding: 25px 20px;
      background-color: #f0f6ff;
    }

    .content h2 {
      color: #003366;
      margin-top: 0;
    }

    .stock-card {
      background-color: #ffffff;
      border: 1px solid #cce0ff;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
    }

    .metric {
      display: inline-block;
      margin: 5px 12px 5px 0;
      font-weight: bold;
      color: #004080;
    }

    .positive {
      color: #0077cc;
    }

    .negative {
      color: #003366;
    }

    .disclaimer {
      background-color: #e6f2ff;
      border-left: 4px solid #004080;
      padding: 15px;
      margin-top: 25px;
      border-radius: 5px;
      color: #003366;
    }

    .footer {
      background-color: #004080;
      color: #ffffff;
      text-align: center;
      padding: 15px 20px;
      font-size: 13px;
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>${profileTitles[profile as keyof typeof profileTitles]}</h1>
    <p>${profileDescriptions[profile as keyof typeof profileDescriptions]}</p>
    <p><em>Generated on ${new Date().toLocaleDateString()}</em></p>
  </div>

  <div class="content">
    <h2>Your Selected Stocks Analysis</h2>

    <!-- Example Stock Card -->
    <div class="stock-card">
      <div class="metric">Stock: <span class="positive">Apple Inc. (AAPL)</span></div><br>
      <div class="metric">Price: $150.23</div>
      <div class="metric">Change: <span class="positive">+1.23%</span></div>
      <div class="metric">Volume: 52M</div>
    </div>

    <div class="stock-card">
      <div class="metric">Stock: <span class="negative">Tesla (TSLA)</span></div><br>
      <div class="metric">Price: $620.12</div>
      <div class="metric">Change: <span class="negative">-2.31%</span></div>
      <div class="metric">Volume: 34M</div>
    </div>

    <div class="disclaimer">
      This report is for informational purposes only and does not constitute financial advice. Please consult a certified advisor before making investment decisions.
    </div>
  </div>

  <div class="footer">
    &copy; ${new Date().getFullYear()} Stock Insights. All rights reserved.
  </div>

</body>
</html>

  `;

  stocksData.forEach(stock => {
    if (!stock) return;
    
    const changeClass = stock.change >= 0 ? 'positive' : 'negative';
    const changeSymbol = stock.change >= 0 ? '+' : '';
    
    emailContent += `
      <div class="stock-card">
        <h3>${stock.symbol} - ${stock.name}</h3>
        <div class="metric"><strong>Current Price:</strong> $${stock.currentPrice.toFixed(2)}</div>
        <div class="metric ${changeClass}">
          <strong>Change:</strong> ${changeSymbol}$${stock.change.toFixed(2)} (${changeSymbol}${stock.changePercent.toFixed(2)}%)
        </div>
        <div class="metric"><strong>Volume:</strong> ${stock.volume.toLocaleString()}</div>
        ${stock.marketCap ? `<div class="metric"><strong>Market Cap:</strong> $${(stock.marketCap / 1000000000).toFixed(2)}B</div>` : ''}
        ${stock.peRatio ? `<div class="metric"><strong>P/E Ratio:</strong> ${stock.peRatio}</div>` : ''}
        ${stock.dividendYield ? `<div class="metric"><strong>Dividend Yield:</strong> ${stock.dividendYield.toFixed(2)}%</div>` : ''}
        ${stock.high52Week && stock.low52Week ? `
          <div class="metric"><strong>52-Week Range:</strong> $${stock.low52Week.toFixed(2)} - $${stock.high52Week.toFixed(2)}</div>
        ` : ''}
      </div>
    `;
  });

  emailContent += `
        <div class="disclaimer">
          <h3>⚠️ Important Disclaimer</h3>
          <p>This analysis is for educational purposes only and should not be considered as financial advice. 
          Always consult with a qualified financial advisor before making investment decisions. 
          Past performance does not guarantee future results. Investing involves risk, including potential loss of principal.</p>
        </div>
        
        <p>Thank you for using our investment analysis tool!</p>
        <p><em>Data provided by Alpha Vantage</em></p>
      </div>
    </body>
    </html>
  `;

  return emailContent;
};

// Email sending endpoint
app.post('/api/send-stock-analysis', async (req, res) => {
  try {
    const { email, selectedStocks, profile }: EmailRequest = req.body;

    if (!email || !selectedStocks || selectedStocks.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and selected stocks are required' 
      });
    }

    // Fetch stock data for selected stocks
    console.log('Fetching stock data for:', selectedStocks);
    const stockDataPromises = selectedStocks.map(symbol => getCompleteStockData(symbol));
    const stocksData = await Promise.all(stockDataPromises);
    
    // Filter out null results
    const validStocksData = stocksData.filter(stock => stock !== null) as StockData[];

    if (validStocksData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Unable to fetch data for any of the selected stocks'
      });
    }

    // Generate email content
    const emailContent = generateEmailTemplate(validStocksData, profile, selectedStocks);

    // Send email
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your ${profile.charAt(0).toUpperCase() + profile.slice(1)} Investment Analysis`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Stock analysis sent successfully!',
      stocksAnalyzed: validStocksData.length
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test stock data endpoint
app.get('/api/test-stock/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stockData = await getCompleteStockData(symbol);
    res.json({ success: true, data: stockData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Make sure to set the following environment variables:');
  console.log('- EMAIL_USER: Your email address');
  console.log('- EMAIL_APP_PASSWORD: Your email app password');
  console.log('- ALPHA_VANTAGE_API_KEY: Your Alpha Vantage API key');
});

export default app;