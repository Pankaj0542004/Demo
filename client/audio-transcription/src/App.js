import React, { useState, Suspense, lazy } from 'react';
import axios from 'axios';

const TranscriptionDisplay = lazy(() => import('./TranscriptionDisplay'));

function App() {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setTranscription('');
        setError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }
        const formData = new FormData();
        formData.append('audio', file);
    
        setLoading(true);  
        try {
            const response = await axios.post('http://localhost:5000/transcribe', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTranscription(response.data.segments);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred during transcription.');
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-gray-200 bg-gray-800">
            <h1 className="mb-8 text-4xl font-bold tracking-wide text-blue-400">Audio to Text Transcription</h1>
            
            <form onSubmit={handleSubmit} className="w-11/12 p-8 bg-gray-900 rounded-lg shadow-lg md:w-96 lg:w-80">
                <div className="mb-4">
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".wav" 
                        className="w-full px-4 py-2 text-sm text-gray-800 bg-white border border-gray-400 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <h1 className='mb-4 text-xs font-medium text-gray-400'>Supported format: .wav</h1>
                <button 
                    type="submit" 
                    className="w-full py-2 text-sm font-semibold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Transcribe
                </button>
            </form>

            {error && <p className="mt-6 text-sm font-medium text-red-500">{error}</p>}

            {loading && <p className="mt-6 text-sm text-gray-400">Transcripting...</p>}

            {transcription && (
                <Suspense fallback={<p className="mt-6 text-gray-400">Loading transcription...</p>}>
                    <TranscriptionDisplay transcription={transcription} />
                </Suspense>
            )}
        </div>
    );
}

export default App;
