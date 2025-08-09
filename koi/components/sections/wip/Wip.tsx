"use client"
import { CenterContainer, GreenBackground } from '@/components'
import React from 'react'

const Wip = () => {
    return (
        <>
            <GreenBackground />
            <CenterContainer className='flex-col'>
                <p className="p-8 text-emerald-700 font-semibold text-balance">
                    Sorry! This page is still a work in progress (˵ ͡° ͜ʖ ͡°˵)
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-transparent hover:drop-shadow-md focus:drop-shadow-emerald-400 hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded shadow">
                    Back to home
                </button>
            </CenterContainer>
        </>
    )
}

export default Wip

