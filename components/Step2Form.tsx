import { useForm } from 'react-hook-form'
import axios from 'axios'

type FormData = {
  panNumber: string
  businessName: string
  businessType: string
}

export default function Step2Form({ onSubmitComplete }: { onSubmitComplete: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/validate-pan', {
        pan: data.panNumber
      })
      if (response.data.valid) {
        const saveResponse = await axios.post('http://localhost:3001/api/submit', data)
        if (saveResponse.status === 200) {
          onSubmitComplete()
        }
      }
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Step 2: PAN & Business Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
            PAN Number
          </label>
          <input
            id="panNumber"
            type="text"
            {...register('panNumber', {
              required: 'PAN number is required',
              pattern: {
                value: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
                message: 'Invalid PAN format (e.g., ABCDE1234F)'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter PAN number"
          />
          {errors.panNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.panNumber.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            {...register('businessName', {
              required: 'Business name is required',
              minLength: {
                value: 3,
                message: 'Business name must be at least 3 characters'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            placeholder="Enter business name"
          />
          {errors.businessName && (
            <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
            Business Type
          </label>
          <select
            id="businessType"
            {...register('businessType', {
              required: 'Business type is required'
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Select business type</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="LLP">LLP</option>
            <option value="Private Limited">Private Limited</option>
          </select>
          {errors.businessType && (
            <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  )
}