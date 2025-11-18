import React, { useState } from 'react';
import { Leaf, Droplets, Trash2, Factory, Recycle, Globe, ShoppingBag, Coffee, Shirt, Package, Smartphone } from 'lucide-react';

const SustainabilityGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "You need a new outfit for a party this weekend...",
      icon: Shirt,
      optionA: {
        text: "Buy new fast fashion",
        impact: -2,
        consequence: "New clothing production uses 2,700 liters of water (enough for one person to drink for 2.5 years)"
      },
      optionB: {
        text: "Thrift or swap with friends",
        impact: 2,
        consequence: "Thrifting saves 25kg of CO2 emissions per garment"
      }
    },
    {
      id: 2,
      question: "Your morning coffee routine...",
      icon: Coffee,
      optionA: {
        text: "Disposable cup from café",
        impact: -1,
        consequence: "Americans throw away 25 billion disposable coffee cups annually"
      },
      optionB: {
        text: "Reusable tumbler",
        impact: 2,
        consequence: "One reusable cup prevents 500+ disposable cups from landfills per year"
      }
    },
    {
      id: 3,
      question: "Time to do laundry...",
      icon: Droplets,
      optionA: {
        text: "Hot water, tumble dry",
        impact: -2,
        consequence: "Dryers use 5x more energy than air-drying and release microplastics"
      },
      optionB: {
        text: "Cold water, air dry",
        impact: 2,
        consequence: "Washing in cold water saves 90% of energy and prevents microplastic shedding"
      }
    },
    {
      id: 4,
      question: "Grocery shopping for the week...",
      icon: ShoppingBag,
      optionA: {
        text: "Plastic bags for produce",
        impact: -1,
        consequence: "1 million plastic bags are used per minute globally"
      },
      optionB: {
        text: "Reusable produce bags",
        impact: 1,
        consequence: "Reusable bags prevent 170 plastic bags from waste annually"
      }
    },
    {
      id: 5,
      question: "Your phone needs an upgrade...",
      icon: Smartphone,
      optionA: {
        text: "Buy the newest model",
        impact: -2,
        consequence: "E-waste is the fastest growing waste stream; 50M tons generated yearly"
      },
      optionB: {
        text: "Keep it or buy refurbished",
        impact: 2,
        consequence: "Extending phone life by 1 year prevents 58kg of CO2 emissions"
      }
    }
  ];

  const handleChoice = (option, impact, consequence) => {
    setChoices([...choices, { option, consequence }]);
    setScore(score + impact);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setGameEnded(true), 300);
    }
  };

  const getResultData = () => {
    if (score >= 7) {
      return {
        title: "Earth Guardian! 🌍",
        message: "Your choices are making a real difference! You're actively protecting our planet.",
        color: "from-green-600 to-emerald-600",
        textColor: "text-green-600"
      };
    } else if (score >= 3) {
      return {
        title: "On the Right Path 🌱",
        message: "You're making some sustainable choices! Small changes add up to big impact.",
        color: "from-blue-600 to-cyan-600",
        textColor: "text-blue-600"
      };
    } else if (score >= -2) {
      return {
        title: "Room to Grow 🌾",
        message: "Your choices have mixed impact. Every sustainable swap counts!",
        color: "from-yellow-600 to-orange-600",
        textColor: "text-yellow-600"
      };
    } else {
      return {
        title: "Earth Needs You 🔥",
        message: "Your current choices are harming the planet. It's not too late to change!",
        color: "from-red-600 to-rose-600",
        textColor: "text-red-600"
      };
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setGameStarted(false);
    setGameEnded(false);
    setChoices([]);
    setScore(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20 shadow-2xl">
          <Globe className="w-24 h-24 mx-auto mb-6 text-emerald-300 animate-pulse" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Earth Impact
          </h1>
          <p className="text-xl text-emerald-100 mb-8">
            Every choice you make affects our planet. Make 5 decisions and discover your environmental impact.
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const result = getResultData();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className={`bg-gradient-to-r ${result.color} text-white rounded-2xl p-8 mb-8 text-center`}>
            <h2 className="text-4xl font-bold mb-4">{result.title}</h2>
            <p className="text-xl mb-4">{result.message}</p>
            <div className="text-6xl font-bold">
              {score > 0 ? '+' : ''}{score} points
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Impact Breakdown</h3>
          
          <div className="space-y-4 mb-8">
            {choices.map((choice, index) => {
              const isGoodChoice = questions[index][`option${choice.option}`].impact > 0;
              return (
                <div key={index} className={`rounded-xl p-4 border ${
                  isGoodChoice 
                    ? 'bg-emerald-500/10 border-emerald-400/30' 
                    : 'bg-red-500/10 border-red-400/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {isGoodChoice ? '✅' : '❌'}
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">
                        Question {index + 1}: {questions[index].question}
                      </p>
                      <p className={`font-medium mb-1 ${
                        isGoodChoice ? 'text-emerald-300' : 'text-red-300'
                      }`}>
                        Your choice: {questions[index][`option${choice.option}`].text}
                      </p>
                      <p className={`text-sm ${
                        isGoodChoice ? 'text-emerald-200' : 'text-red-200'
                      }`}>
                        {choice.consequence}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mb-6 border border-blue-400/30">
            <h4 className="text-white font-bold mb-2 text-lg">Real World Impact:</h4>
            <p className="text-blue-200">
              If everyone at Syracuse University (22,000 students) made sustainable choices like yours, 
              we could collectively {score > 0 ? 'save' : 'waste'} approximately{' '}
              <span className="font-bold text-white">
                {Math.abs(score * 22000 * 10)} kg of CO2
              </span>{' '}
              per year - equivalent to taking {Math.abs(Math.round(score * 22000 * 10 / 4000))} cars off the road!
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Try Again
            </button>
            <a
              href="https://www.instagram.com/revamped.cuse/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Shop Sustainable @ Revamped
            </a>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const QuestionIcon = q.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <QuestionIcon className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {q.question}
          </h2>
          <p className="text-xl text-purple-200">Choose one...</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleChoice('A', q.optionA.impact, q.optionA.consequence)}
            className="group bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 hover:border-purple-400 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-6 mb-6 group-hover:scale-110 transition-transform">
                <Package className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {q.optionA.text}
              </h3>
            </div>
          </button>

          <button
            onClick={() => handleChoice('B', q.optionB.impact, q.optionB.consequence)}
            className="group bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 hover:border-purple-400 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full p-6 mb-6 group-hover:scale-110 transition-transform">
                <Recycle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {q.optionB.text}
              </h3>
            </div>
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index < currentQuestion
                  ? 'w-8 bg-purple-400'
                  : index === currentQuestion
                  ? 'w-12 bg-pink-400'
                  : 'w-8 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainabilityGame;