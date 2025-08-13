import { useForm } from 'react-hook-form'
import axios from 'axios'

type FormData = {
  aadhaarNumber: string
  consent: boolean
}

export default function Step1Form({ onNext }: { onNext: (data: FormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('https://udyam-registration-scrapping-backend.onrender.com/api/validate-aadhaar', {
        aadhaar: data.aadhaarNumber
      })
      if (response.data.valid) {
        onNext({aadhaarNumber: data.aadhaarNumber, consent: data.consent})
      }
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-black">Step 1: Aadhaar Verification</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
            Aadhaar Number
          </label>
          <input
            id="aadhaarNumber"
            type="text"
            {...register('aadhaarNumber', {
              required: 'Aadhaar number is required',
              pattern: {
                value: /^[2-9]{1}[0-9]{11}$/,
                message: 'Invalid Aadhaar number format'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-black placeholder:text-gray-400"
            placeholder="Enter 12-digit Aadhaar number"
          />
          {errors.aadhaarNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.aadhaarNumber.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="consent"
            type="checkbox"
            {...register('consent', {
              required: 'You must give consent to proceed'
            })}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
            I consent to Aadhaar verification
          </label>
        </div>
        {errors.consent && (
          <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Verify & Proceed
          </button>
        </div>
      </form>
    </div>
  )
}