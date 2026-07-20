import React, { useState } from 'react';
import JSZip from 'jszip';
import { androidFiles } from '../data/androidCodebase';
import { AndroidFile } from '../types';
import { Folder, File, Download, Copy, Check, Search, FileCode, Terminal } from 'lucide-react';

export default function AndroidStudioExplorer() {
  const [selectedFile, setSelectedFile] = useState<AndroidFile>(androidFiles[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [zipping, setZipping] = useState(false);

  const filteredFiles = androidFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      
      // Add all project files dynamically
      androidFiles.forEach(file => {
        zip.file(file.path, file.content);
      });

      // Generate additional standard Gradle structures so the project compiles directly
      zip.file('.gitignore', `*.iml\n.gradle\n/local.properties\n/.idea\n/build\n.DS_Store`);
      
      // Trigger browser download
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'WhatsAppTwo_Android_Kotlin_Project.zip';
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setZipping(false);
    }
  };

  const getFileIcon = (lang: string) => {
    switch (lang) {
      case 'kotlin': return <FileCode className="w-4 h-4 text-purple-400" />;
      case 'xml': return <FileCode className="w-4 h-4 text-orange-400" />;
      case 'gradle': return <Terminal className="w-4 h-4 text-teal-400" />;
      default: return <File className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0E11] text-[#E1E1E1] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
      {/* Header Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#121619] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF4F5E] block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 block"></span>
            <span className="w-3 h-3 rounded-full bg-[#25D366] block"></span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-slate-400 uppercase font-mono">
            Android Studio Workspace Explorer
          </span>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={zipping}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-black font-semibold text-xs px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-200 active:scale-95 disabled:opacity-50 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
        >
          <Download className="w-4 h-4" />
          {zipping ? 'Packaging ZIP...' : 'Download Full Android Project (.zip)'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Project Navigator */}
        <div className="w-80 bg-[#121619] flex flex-col border-r border-white/5">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search project files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1F2428] border border-white/5 text-sm pl-9 pr-3 py-2 rounded-lg text-[#E1E1E1] placeholder-slate-500 focus:outline-none focus:border-[#25D366] font-mono"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase font-mono">
              <Folder className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              Project Files
            </div>
            
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-left text-xs font-mono transition-all duration-150 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#1F2428] text-white font-medium border-l-2 border-[#25D366] shadow-sm' 
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  {getFileIcon(file.language)}
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="flex-1 flex flex-col bg-[#0B0E11] overflow-hidden">
          {/* Active File Header */}
          <div className="flex justify-between items-center px-6 py-3.5 bg-[#15191C] border-b border-white/5">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
              <span className="text-slate-500">path:</span>
              <span className="text-[#25D366]">{selectedFile.path}</span>
            </div>
            
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-[#1F2428] hover:bg-white/10 px-3 py-1.5 border border-white/5 rounded-md cursor-pointer transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          {/* Actual Code Display */}
          <div className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-left flex bg-[#0B0E11]">
            {/* Line numbers column */}
            <div className="text-right text-slate-600 select-none pr-4 border-r border-white/5 flex flex-col font-mono">
              {selectedFile.content.split('\n').map((_, idx) => (
                <span key={idx} className="block leading-6 h-6">{idx + 1}</span>
              ))}
            </div>
            {/* Content lines */}
            <pre className="pl-4 text-slate-200 w-full selection:bg-[#1F2428] flex-1 overflow-x-auto">
              <code>
                {selectedFile.content.split('\n').map((line, idx) => (
                  <span key={idx} className="block leading-6 h-6 whitespace-pre">{line}</span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
