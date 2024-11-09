import React from 'react';

function TranscriptionDisplay({ transcription }) {
    return (
        <div className="w-full p-6 mt-6 text-gray-200 bg-gray-800 rounded-lg shadow-lg md:w-2/3 lg:w-1/2">
            <h2 className="mb-4 text-xl font-bold text-blue-400">Transcription</h2>
            <div className="space-y-4">
                {transcription.map((segment, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-md shadow-inner">
                        <div className="flex items-center justify-between text-xs text-gray-400">
                            <p><strong>Start:</strong> {segment.start.toFixed(2)}s</p>
                            <p><strong>End:</strong> {segment.end.toFixed(2)}s</p>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300">{segment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TranscriptionDisplay;
