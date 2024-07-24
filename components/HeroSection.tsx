"use client";

import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, CheckCircle } from "lucide-react";

export function HeroSection() {
  const services = [
    "Corporate Offices",
    "Medical Facilities",
    "Educational Institutions",
    "Industrial Spaces",
    "Retail Stores",
  ];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      loop: 1,
      playlist: "ODoLwsSyd4o",
      modestbranding: 1,
    },
  };

  const onReady = (event: { target: any }) => {
    playerRef.current = event.target;
    event.target.playVideo();
    updateVideoSize();
  };

  const toggleVideo = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      playerRef.current?.unMute();
    } else {
      playerRef.current?.mute();
    }
  };

  const updateVideoSize = () => {
    if (containerRef.current && playerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const aspectRatio = 16 / 9; // Assuming 16:9 aspect ratio for the video

      let width = containerWidth;
      let height = containerWidth / aspectRatio;

      if (height < containerHeight) {
        height = containerHeight;
        width = containerHeight * aspectRatio;
      }

      playerRef.current.setSize(width, height);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateVideoSize);
    return () => window.removeEventListener("resize", updateVideoSize);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <YouTube
          videoId="Rt7iUhijySY"
          opts={opts}
          onReady={onReady}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-center z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-5xl space-y-8 px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white text-shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Expert Commercial Cleaning Services in Chattanooga
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 text-shadow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Elevate your business environment with our 8+ years of cleaning
            expertise
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
              >
                <CheckCircle className="text-primary mr-2" size={16} />
                <span className="text-white text-sm">{service}</span>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 text-lg px-8 py-3 w-full sm:w-auto"
            >
              Get a Free Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-3 w-full sm:w-auto"
            >
              Our Services
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="absolute bottom-4 right-4 flex space-x-2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button
            onClick={toggleVideo}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
