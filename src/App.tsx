import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wand2, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  UploadCloud, 
  Lock, 
  Download, 
  Code, 
  Check, 
  Search, 
  Zap, 
  Globe, 
  PenTool,
  ChevronRight,
  Menu,
  X,
  Type
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type ExtractMode = 'url' | 'image';

interface FontResult {
  id: string;
  name: string;
  family: string;
  weights: number[];
  styles: string[];
  source: string;
  category: string;
}

// --- Mock Data ---
const MOCK_RESULTS: FontResult[] = [
  {
    id: '1',
    name: 'Inter',
    family: '"Inter", sans-serif',
    weights: [400, 500, 600, 700],
    styles: ['Normal', 'Italic'],
    source: 'Google Fonts',
    category: 'Sans Serif'
  },
  {
    id: '2',
    name: 'Playfair Display',
    family: '"Playfair Display", serif',
    weights: [400, 700],
    styles: ['Normal', 'Italic'],
    source: 'Google Fonts',
    category: 'Serif'
  },
  {
    id: '3',
    name: 'JetBrains Mono',
    family: '"JetBrains Mono", monospace',
    weights: [400],
    styles: ['Normal'],
    source: 'Custom Font',
    category: 'Monospace'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [extractMode, setExtractMode] = useState<ExtractMode>('url');
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileState, setFileState] = useState<File | null>(null);

  // --- Handlers ---
  const handleExtract = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (extractMode === 'url' && !urlInput.trim()) return;
    if (extractMode === 'image' && !fileState) return;

    setIsProcessing(true);
    setShowResults(false);

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
      // Smooth scroll to results
      setTimeout(() => {
         document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 2500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileState(e.dataTransfer.files[0]);
    }
  };

  const resetState = () => {
    setShowResults(false);
    setUrlInput('');
    setFileState(null);
  };

  return (
    <div className="min-h-screen bg-[#0c0a0f] text-gray-100 font-sans selection:bg-brand-500/30">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0c0a0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white">Font Extractor</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">How it Works</a>
              <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-[#120f18]"
            >
              <div className="flex flex-col px-4 py-4 gap-4">
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300">How it Works</a>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300">Features</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-300">FAQ</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-600/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white mb-6"
            >
              Extract Any Font in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-400">Seconds.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-400 mb-2"
            >
              Instantly identify and extract fonts from any website URL or image.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-md text-gray-500 mb-12 flex items-center justify-center gap-2"
            >
               <Lock className="w-4 h-4" /> No signup required. 100% Free forever.
            </motion.p>

            {/* Extractor Component */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full max-w-2xl mx-auto bg-[#15121b] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
            >
              {/* Tabs */}
              <div className="flex bg-[#0c0a0f] p-1 rounded-xl mb-4 relative">
                <button
                  onClick={() => setExtractMode('url')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors relative z-10",
                    extractMode === 'url' ? "text-white" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <LinkIcon className="w-4 h-4" /> Extract from URL
                </button>
                <button
                  onClick={() => setExtractMode('image')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-colors relative z-10",
                    extractMode === 'image' ? "text-white" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  <ImageIcon className="w-4 h-4" /> Extract from Image
                </button>

                {/* Animated Tab Indicator */}
                <div 
                  className={cn(
                    "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1e1a26] rounded-lg shadow-sm transition-transform duration-300 ease-in-out border border-white/5",
                    extractMode === 'url' ? "translate-x-0" : "translate-x-full"
                  )}
                  style={{ left: '4px' }}
                />
              </div>

              {/* Input Area */}
              <div className="p-4 sm:p-6 pb-2 min-h-[180px] flex flex-col">
                <AnimatePresence mode="wait">
                  {extractMode === 'url' ? (
                    <motion.form 
                      key="url"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex flex-col"
                      onSubmit={handleExtract}
                    >
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="w-5 h-5 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                        </div>
                        <input
                          type="url"
                          required
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          placeholder="Paste website URL here (e.g., https://example.com)"
                          className="block w-full pl-12 pr-4 py-4 bg-[#0c0a0f] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none transition-all"
                        />
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1"
                    >
                      <div 
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={cn(
                          "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer group h-[160px]",
                          dragActive 
                            ? "border-brand-500 bg-brand-500/5" 
                            : "border-white/10 hover:border-white/20 hover:bg-white/5",
                          fileState && "border-brand-400 bg-brand-400/5"
                        )}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input 
                          id="file-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setFileState(e.target.files[0]);
                            }
                          }}
                        />
                        {fileState ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center">
                              <Check className="w-6 h-6 text-brand-400" />
                            </div>
                            <span className="text-sm font-medium text-brand-300">{fileState.name}</span>
                            <span className="text-xs text-gray-500">Click to change</span>
                          </div>
                        ) : (
                          <>
                            <UploadCloud className="w-8 h-8 text-gray-400 mb-3 group-hover:text-brand-400 transition-colors" />
                            <p className="text-sm text-gray-300 font-medium mb-1">
                              Drag & drop an image here
                            </p>
                            <p className="text-xs text-gray-500">
                              or click to browse (PNG, JPG, WEBP)
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary Action Button */}
                <div className="mt-6">
                  <button
                    onClick={() => handleExtract()}
                    disabled={isProcessing || (extractMode === 'url' && !urlInput) || (extractMode === 'image' && !fileState)}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-500 hover:to-teal-500 text-white font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Extract Fonts <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Scanning/Processing State --- */}
        <AnimatePresence>
          {isProcessing && (
            <motion.section 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-5xl mx-auto px-4 overflow-hidden"
            >
              <div className="border border-white/5 bg-[#15121b]/50 rounded-2xl p-8 mb-32 flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative w-full max-w-2xl h-2 bg-[#0c0a0f] rounded-full overflow-hidden mb-8 shadow-inner">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "linear" }}
                  />
                </div>

                <div className="flex flex-col items-center gap-4">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20"
                  >
                    <Search className="w-8 h-8 text-brand-400" />
                  </motion.div>
                  <p className="text-xl font-medium text-white">
                    {extractMode === 'url' ? "Scanning DOM and parsing CSS stylesheets..." : "Analyzing pixel structures using AI model..."}
                  </p>
                  <p className="text-sm text-gray-500">
                    Locating typography patterns, font weights, and web font definitions.
                  </p>

                  <div className="flex gap-3 mt-4">
                    {/* Fake skeleton chips */}
                    {[1, 2, 3].map((i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.4 }}
                        className="h-8 w-24 bg-white/5 rounded-full animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* --- Results Section --- */}
        <AnimatePresence>
          {showResults && (
            <motion.section 
              id="results-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-3">
                    <Check className="w-4 h-4" /> Extraction Complete
                  </div>
                  <h2 className="text-3xl font-display font-bold tracking-tight text-white">Found 3 Fonts</h2>
                  <p className="text-gray-400 mt-1">
                    {extractMode === 'url' ? `Extracted from ${urlInput || 'the specified URL'}` : 'Extracted from uploaded image'}
                  </p>
                </div>
                <button 
                  onClick={resetState}
                  className="text-sm text-brand-400 hover:text-brand-300 font-medium"
                >
                  Start new extraction
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {MOCK_RESULTS.map((font, idx) => (
                  <FontResultCard key={font.id} font={font} index={idx} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* --- How It Works --- */}
        <section id="how-it-works" className="py-24 border-t border-white/5 bg-[#0c0a0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Three simple steps to uncover the typography behind any beautiful design. Never wonder what font they used again.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-[#120f18] hover:border-brand-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform">
                  <LinkIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">1. Input</h3>
                <p className="text-gray-400 text-sm">Paste a live website URL or upload a design mockup screenshot.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-[#120f18] hover:border-teal-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 text-teal-400 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">2. Analyze</h3>
                <p className="text-gray-400 text-sm">Our system instantly scans CSS trees or utilizes computer vision to identify text.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-[#120f18] hover:border-brand-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform">
                  <Download className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">3. Extract</h3>
                <p className="text-gray-400 text-sm">Download font files directly, or copy the exact CSS and Google Fonts links.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section id="features" className="py-24 border-t border-white/5 bg-[#120f18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 md:flex md:items-end justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4">Built for Designers & Developers</h2>
                <p className="text-gray-400">Everything you need to integrate beautiful typography into your next project, without the friction.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl border border-white/5 bg-[#0c0a0f] hover:bg-[#15121b] transition-colors">
                <Zap className="w-6 h-6 text-brand-400 mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">Get results in milliseconds. We've optimized our parsers to ensure you never wait to find the perfect font.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-8 rounded-3xl border border-white/5 bg-[#0c0a0f] hover:bg-[#15121b] transition-colors">
                <ImageIcon className="w-6 h-6 text-teal-400 mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">Web & Image Support</h3>
                <p className="text-gray-400 text-sm">Whether it's a live React application or a flat JPEG from Dribbble, our extractor can handle it.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl border border-white/5 bg-[#0c0a0f] hover:bg-[#15121b] transition-colors">
                <Lock className="w-6 h-6 text-green-400 mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">Zero Friction</h3>
                <p className="text-gray-400 text-sm">No accounts. No paywalls. No subscription traps. Jump right in and start extracting typography immediately.</p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 rounded-3xl border border-white/5 bg-[#0c0a0f] hover:bg-[#15121b] transition-colors">
                <Code className="w-6 h-6 text-brand-400 mb-4" />
                <h3 className="text-xl font-display font-bold text-white mb-2">Developer Ready</h3>
                <p className="text-gray-400 text-sm">Don't manually construct font-family declarations. Copy production-ready CSS snipets straight to your clipboard.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0c0a0f] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-brand-500" />
            <span className="text-xl font-display font-bold tracking-tight text-white">Font Extractor</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Font Extractor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- Subcomponents ---

function FontResultCard({ font, index }: { font: FontResult; index: number }) {
  const [copied, setCopied] = useState(false);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog.');
  
  // Custom font loading simulation
  const applyCustomFont = (fontName: string) => {
    // In a real app we'd load the webfont here.
    // For this mockup, we'll map known fonts to generic families if they don't exist.
    const mappings: Record<string, string> = {
      'Inter': 'Inter, sans-serif',
      'Playfair Display': '"Playfair Display", Georgia, serif',
      'JetBrains Mono': '"JetBrains Mono", monospace'
    }
    return mappings[fontName] || 'sans-serif';
  };

  const cssString = `font-family: ${font.family};\nfont-weight: ${font.weights[0]};\nfont-style: ${font.styles[0].toLowerCase()};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-[#120f18] border border-white/5 overflow-hidden flex flex-col hover:border-brand-500/20 transition-all rounded-[24px]"
    >
      <div className="p-6 md:p-8 flex-1 flex flex-col relative grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Details */}
        <div className="md:col-span-4 flex flex-col border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-8">
          <div className="flex items-center gap-2 mb-1">
            <Type className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-semibold text-brand-400 tracking-wider uppercase">{font.category}</span>
          </div>
          <h3 className="text-3xl font-display font-bold tracking-tight text-white mb-4">{font.name}</h3>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
             <div>
               <span className="block text-gray-500 mb-1">Source</span>
               <span className="text-gray-200 font-medium flex items-center gap-1">
                 {font.source === 'Google Fonts' && <Globe className="w-3 h-3 text-gray-400" />}
                 {font.source}
               </span>
             </div>
             <div>
               <span className="block text-gray-500 mb-1">Weights</span>
               <span className="text-gray-200 font-medium">{font.weights.join(', ')}</span>
             </div>
             <div>
               <span className="block text-gray-500 mb-1">Styles</span>
               <span className="text-gray-200 font-medium">{font.styles.join(', ')}</span>
             </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
             <button className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
               <Download className="w-4 h-4" /> 
               {font.source === 'Google Fonts' ? 'Get Google Font' : 'Download Files'}
             </button>
             <button 
               onClick={copyToClipboard}
               className="w-full py-2.5 px-4 rounded-xl bg-[#1e1a26] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#2a2435] transition-colors border border-white/5"
             >
               {copied ? <Check className="w-4 h-4 text-green-400" /> : <Code className="w-4 h-4 text-gray-400" />} 
               {copied ? 'Copied to Clipboard' : 'Copy CSS'}
             </button>
          </div>
        </div>

        {/* Right Column: Interactive Preview */}
        <div className="md:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <PenTool className="w-4 h-4" /> Live Preview
            </span>
          </div>
          
          <div className="flex-1 min-h-[200px] bg-[#0c0a0f] rounded-xl border border-white/5 p-6 relative group overflow-hidden">
            {/* The editable text area */}
            <textarea
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full h-full bg-transparent resize-none outline-none text-white overflow-y-auto leading-tight transition-all duration-300"
              style={{
                fontFamily: applyCustomFont(font.name),
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: font.weights[font.weights.length - 1] // Use heaviest weight for impact in mockup
              }}
              spellCheck={false}
            />
            {/* Hover hint */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-[#1e1a26]/80 text-xs text-gray-400 rounded opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md pointer-events-none">
              Click to edit
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

