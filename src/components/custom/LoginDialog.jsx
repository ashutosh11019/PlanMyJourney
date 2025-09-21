import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

const LoginDialog = ({ openDialog, setOpenDialog, login }) => {
    return (
        <Dialog open={openDialog} onOpenChange={(v) => setOpenDialog(v)}>
            <DialogContent className="bg-white p-8 rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex justify-center items-center font-geist"><img src="/logo.png" alt="Logo" className="w-16 h-12 mr-2" /> MakeMyJourney.ai</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center font-geist">
                    Please log in with your Google account for a secure and seamless experience.
                </DialogDescription>
                <Button variant="outline" onClick={login} className=" font-geist w-full border-2 border-yellow-400 bg-yellow-200 text-black hover:bg-yellow-400">
                    <FcGoogle className="!h-8 !w-8 mr-2" /> Continue with Google
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog