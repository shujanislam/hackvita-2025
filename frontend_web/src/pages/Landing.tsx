import { FaBrain, FaChalkboardTeacher, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
          {/* Hero Section */}
          <header className="text-center py-24 px-6 flex flex-col items-center">
            <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 mb-4">
              Welcome to LearnSmart
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl text-center">
              Personalized learning based on your understanding capabilities. Take a test and get the best study material curated just for you!
            </p>
            <button onClick={()=> {
                navigate('/user/login')
            }} className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-105 rounded-lg text-lg font-semibold shadow-lg">
              Get Started
            </button>
          </header>
    
          {/* Features Section */}
          <section className="py-16 px-6">
            <h2 className="text-4xl font-semibold text-center mb-12 text-blue-400">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { title: "Assess Your Knowledge", desc: "Take a short test to evaluate your understanding of various topics.", icon: <FaBrain className='text-blue-400 text-5xl' /> },
                { title: "Personalized Learning", desc: "Get study material tailored to your learning level.", icon: <FaChalkboardTeacher className='text-green-400 text-5xl' /> },
                { title: "Best Video Recommendations", desc: "Access top YouTube videos that explain concepts in the best way.", icon: <FaYoutube className='text-red-500 text-5xl' /> }
              ].map((feature, index) => (
                <div key={index} className="p-8 bg-gray-800 rounded-xl shadow-xl text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-2xl font-bold mt-4 mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
    
          {/* About Section */}
          <section className="py-20 px-6 bg-gray-800 text-center">
            <h2 className="text-4xl font-semibold mb-6 text-green-400">About LearnSmart</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              LearnSmart is an AI-powered platform that helps students learn effectively by assessing their knowledge and providing customized study resources and video recommendations.
            </p>
          </section>
    
          {/* Call to Action */}
          <section className="text-center py-16 px-6">
            <h2 className="text-4xl font-semibold mb-6 text-yellow-400">Start Your Learning Journey</h2>
            <button onClick={()=> {
                navigate('/user/login')
            }} className="px-8 py-3 bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-105 rounded-lg text-lg font-semibold shadow-lg">
              Start Now
            </button>
          </section>
    
          {/* Footer */}
          <footer className="py-8 bg-gray-900 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} LearnSmart. All rights reserved.</p>
          </footer>
        </div>
      );
};

export default Landing;
