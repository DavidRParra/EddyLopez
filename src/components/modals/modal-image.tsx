'use client';
import React from 'react';

interface ModalImageProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

export default function ModalImage({children, isOpen, onClose}: {children: React.ReactNode, isOpen: boolean, onClose: () => void}) {
    if (!isOpen) return null;   

    return (
        <div className="modal-overlay flex fixed top-0 left-0 right-0 bottom-0 h-full w-full items-center justify-center bg-black/90 z-60" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children} 
            </div>
        </div>
    )
};