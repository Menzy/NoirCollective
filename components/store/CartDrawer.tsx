"use client"

import { ShoppingCart, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { usePaystackPayment } from "react-paystack"

export function CartDrawer() {
  const { state, dispatch } = useCart()
  
  const config = {
    reference: new Date().getTime().toString(),
    email: "customer@example.com", // This should come from user input or auth
    amount: Math.round(state.total * 100), // Paystack amount is in pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: "GHS", // Set currency to Ghana cedis
  }
  
  const initializePayment = usePaystackPayment(config)

  const onSuccess = () => {
    dispatch({ type: "CLEAR_CART" })
    alert("Payment successful! Thank you for your purchase.")
  }

  const onClose = () => {
    alert("Payment cancelled.")
  }

  const handleCheckout = () => {
    initializePayment(onSuccess, onClose)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {state.items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-4 h-[calc(100vh-12rem)] overflow-auto">
          {state.items.length === 0 ? (
            <p className="text-center text-muted-foreground">Your cart is empty</p>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image || "https://images.unsplash.com/photo-1553484771-047a44eee27a"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">GH₵ {item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        if (item.quantity === 1) {
                          dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        } else {
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity - 1 }
                          })
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 }
                        })
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto"
                      onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">GH₵ {state.total.toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout with Paystack
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}