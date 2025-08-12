import { useState } from 'react'
import Step1Form from './Step1Form'
import Step2Form from './Step2Form'

export default function FormWrapper() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStep1Complete = () => {
    setCurrentStep(2)
  }

  const handleFormComplete = () => {
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Udyam Registration</h1>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`ml-2 text-sm ${currentStep >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                Aadhaar Verification
              </div>
            </div>
            <div className="flex items-center mx-2">
              <div className="w-8 h-0.5 bg-gray-300"></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`ml-2 text-sm ${currentStep >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                Business Details
              </div>
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <>
            {currentStep === 1 && <Step1Form onNext={handleStep1Complete} />}
            {currentStep === 2 && <Step2Form onSubmitComplete={handleFormComplete} />}
          </>
        ) : (
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful!</h2>
            <p className="text-gray-600">Your Udyam registration has been submitted successfully.</p>
          </div>
        )}
      </div>
    </div>
  )
}