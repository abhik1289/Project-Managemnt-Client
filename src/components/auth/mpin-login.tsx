'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function MpinLogIn({ username = "John Doe" }: { username?: string }) {
  const [mpin, setMpin] = useState<string[]>(Array(4).fill(''))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newMpin = [...mpin]
      newMpin[index] = value
      setMpin(newMpin)
      if (value && index < 3) {
        document.getElementById(`mpin-${index + 1}`)?.focus()
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (mpin.join('') === '1234') { // Replace with actual MPIN validation
      console.log('MPIN correct, accessing main app...')
    } else {
      setError('Incorrect MPIN. Please try again.')
    }
    setIsSubmitting(false)
  }

  const handleKeypadClick = (digit: number) => {
    const emptyIndex = mpin.findIndex(d => d === '')
    if (emptyIndex !== -1) {
      handleInputChange(emptyIndex, digit.toString())
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome back, {username}!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-2">
          {mpin.map((digit, index) => (
            <Input
              key={index}
              id={`mpin-${index}`}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null].map((digit, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-12 ${digit==null ? 'invisible' : ''}`}
              onClick={() => digit !== null && handleKeypadClick(digit)}
            >
              {digit}
            </Button>
          ))}
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="link" className="text-sm">
          Forgot MPIN?
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={mpin.some(d => d === '') || isSubmitting}
          className="w-24 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          ) : (
            <>
              Submit
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}