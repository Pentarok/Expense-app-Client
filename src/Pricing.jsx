const Pricing = () => {
    return (
      <div className="bg-gray-900 text-white py-12 mt-2 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Header */}
          <h2 className="text-3xl font-bold mb-4">Enjoy 1 Month Free!</h2>
          <p className="text-gray-300 mb-6">
            Get started today with a **one-month free trial**. After your trial ends, continue enjoying full access for just <span className="font-semibold">SH 100 per month</span>.
          </p>
  
          {/* Pricing Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg inline-block w-full max-w-md">
            <h3 className="text-2xl font-semibold">Premium Plan</h3>
            <p className="text-4xl font-bold my-4">SH 100<span className="text-xl font-medium">/month</span></p>
            <p className="text-gray-400 mb-6">After 1-month free trial</p>
  
            {/* Features */}
            <ul className="text-left space-y-3">
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Unlimited Expense Tracking</li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> AI-Powered Insights</li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Smart Budgeting Tools</li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Multi-Device Sync</li>
              <li className="flex items-center"><span className="text-green-400 mr-2">✔</span> Secure & Encrypted Data</li>
            </ul>
  
            {/* CTA Button */}
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition">
              Get Started
            </button>
          </div>
  
          {/* Terms */}
          <p className="text-gray-400 text-sm mt-6">
            Cancel anytime before your trial ends to avoid charges. No hidden fees.
          </p>
        </div>
      </div>
    );
  };
  
  export default Pricing;
  