'use client'

import { IEvent } from "@/lib/database/models/event.model"
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Checkout from "./Checkout";


const CheckoutButton = ({ event } : {event: IEvent}) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const {user} = useUser();
  const userId = user?.publicMetadata?.userId as string;
  
  return (
    <div className="flex items-center gap-3">
      {/* Cannot buy past events */}
      { hasEventFinished ? (<p className="p-2 text-red-400">Sorry! This Event has already ended.</p>) : 
      (<>
        <SignedOut>
          <Button asChild className="button rounded-full" size="lg">
            <Link href={`/sign-in`}>Get Ticket</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Checkout event={event} userId={userId} />
        </SignedIn>
      </>)}
    </div>
  )
}

export default CheckoutButton