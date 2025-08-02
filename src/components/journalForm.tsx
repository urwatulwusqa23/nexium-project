'use client'
import { useState, useRef, FormEvent, ChangeEvent } from 'react'

interface JournalFormProps {
  onSuccess: () => void
}

export default function JournalForm({ onSuccess }: JournalFormProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (image) formData.append('image', image)

      const response = await fetch('/api/journals', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Failed to save entry')

      // Reset form
      setTitle('')
      setContent('')
      setImage(null)
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''

      onSuccess()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save journal entry')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border-b border-amber-200 focus:border-amber-500 outline-none bg-transparent"
          required
        />
      </div>
      
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-2 border border-amber-200 rounded focus:border-amber-500 outline-none min-h-[100px]"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="journal-image"
          />
          <label
            htmlFor="journal-image"
            className="text-amber-700 text-sm cursor-pointer hover:text-amber-900"
          >
            {imagePreview ? 'Change Image' : 'Add Image'}
          </label>
          {imagePreview && (
            <div className="relative inline-block ml-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-8 w-8 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImage(null)
                  setImagePreview(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-amber-400"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}