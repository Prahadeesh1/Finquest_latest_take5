
import React from "react";

const testimonials = [
  {
    content:
      "FinanceFlow Together transformed my understanding of investing. The interactive market flowchart made complex concepts so much easier to grasp!",
    author: "Sarah Johnson",
    role: "Small Business Owner",
    image: "/placeholder.svg",
  },
  {
    content:
      "As someone with zero financial background, I was intimidated by investing. This platform broke everything down into digestible chunks. I'm now confidently managing my own portfolio!",
    author: "Michael Chen",
    role: "Software Engineer",
    image: "/placeholder.svg",
  },
  {
    content:
      "The community aspect is what sets this platform apart. Being able to discuss ideas and get feedback from experienced investors has been invaluable for my financial growth.",
    author: "Priya Patel",
    role: "Healthcare Professional",
    image: "/placeholder.svg",
  },
];

const TestimonialSection = () => {
  return (
    <div className="bg-finance-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-finance-primary font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hear from our community
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Discover how FinanceFlow Together has helped people on their journey
            to financial literacy and investment confidence.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 relative card-hover"
            >
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  {/* Quote icon */}
                  <svg
                    className="h-10 w-10 text-finance-primary/20"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>

                <p className="text-gray-600 flex-grow">
                  "{testimonial.content}"
                </p>

                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={testimonial.image}
                      alt={testimonial.author}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
