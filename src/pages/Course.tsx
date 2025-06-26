import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, MessageCircle, Users, Star, ArrowRight, Copy, Check } from 'lucide-react';

interface CourseDetails {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  whatsappLink: string;
  whatsappGroupName: string;
}

const AccessCoursePage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  
  // Mock course data - in real app, this would come from props or API
  const courseDetails: CourseDetails = {
    title: "How I Quietly Made ₦1.2 Million From Just 2 Catfish",
    instructor: "Expert Catfish Farmer",
    duration: "4 weeks",
    students: 1247,
    rating: 4.8,
    whatsappLink: "https://wa.link/531kt2",
    whatsappGroupName: "Catfish Millionaires 2024"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWhatsappJoin = () => {
    window.open(courseDetails.whatsappLink, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(courseDetails.whatsappLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Payment Successful</h1>
                <p className="text-sm text-gray-600">Course access activated</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Order #12345</p>
              <p className="text-xs text-gray-500">June 24, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Course!</h2>
            <p className="text-gray-600 text-lg">
              Your payment has been processed successfully. You now have full access to the course materials.
            </p>
          </div>

          {/* Course Info Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{courseDetails.title}</h3>
                <p className="text-gray-700 mb-3">Learn the Smart, Repeatable Hatching System</p>
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mb-4">
                  <p className="text-orange-800 font-semibold text-sm">
                    🚨 No expensive equipment needed - Just ₦2,000 for this life-changing system!
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{courseDetails.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{courseDetails.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{courseDetails.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Access Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Catfish Farming Community</h3>
            <p className="text-gray-600 mb-4">
              Connect with successful catfish farmers, get expert guidance, and learn the exact system that generated ₦1.2 million from just 2 catfish.
            </p>
            
            {/* Countdown Timer */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 inline-block">
              <div className="flex items-center space-x-2 text-orange-800">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  Join within {formatTime(timeLeft)} to secure your spot!
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp Group Info */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-green-900 mb-2">Group: {courseDetails.whatsappGroupName}</h4>
            <p className="text-green-800 text-sm mb-4">
              Get instant access to course updates, live Q&A sessions, and connect with your learning community.
            </p>
            
            <div className="space-y-2 text-sm text-green-700">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Smart hatching system secrets</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Direct access to proven catfish expert</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Real profit calculations & strategies</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Troubleshooting support for your farm</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Market connections & selling tips</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleWhatsappJoin}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Join Catfish Farmers Group</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleCopyLink}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Alternative Access Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Can't access WhatsApp right now?</strong> No worries! You can also access your catfish farming 
              course materials through your student dashboard. The WhatsApp group link will remain active for 24 hours.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Join WhatsApp</h4>
              <p className="text-gray-600 text-sm">Connect with successful catfish farmers and get expert support</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Learn the System</h4>
              <p className="text-gray-600 text-sm">Master the smart hatching system that works without expensive equipment</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Start Earning</h4>
              <p className="text-gray-600 text-sm">Apply the system and start your journey to catfish farming profits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessCoursePage;