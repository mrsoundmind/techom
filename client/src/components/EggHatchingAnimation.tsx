import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EggHatchingAnimationProps {
  onComplete: () => void;
  projectName: string;
}

export function EggHatchingAnimation({ onComplete, projectName }: EggHatchingAnimationProps) {
  const [stage, setStage] = useState<'floating' | 'cracking' | 'hatched' | 'maya-appears'>('floating');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('cracking'), 800);
    const timer2 = setTimeout(() => setStage('hatched'), 1600);
    const timer3 = setTimeout(() => setStage('maya-appears'), 2200);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Simple Egg */}
        <AnimatePresence mode="wait">
          {stage === 'floating' && (
            <motion.div
              key="floating"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-20 h-24 bg-gradient-to-b from-white to-gray-100 rounded-full relative shadow-lg border border-gray-200">
                <div className="absolute top-2 left-4 w-3 h-2 bg-white/80 rounded-full blur-sm"></div>
              </div>
            </motion.div>
          )}

          {/* Cracking Egg */}
          {stage === 'cracking' && (
            <motion.div
              key="cracking"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, -1, 1, 0]
              }}
              transition={{ duration: 0.8, repeat: 1 }}
              className="mb-8"
            >
              <div className="w-20 h-24 bg-gradient-to-b from-white to-gray-100 rounded-full relative shadow-lg border border-gray-200">
                {/* Simple crack line */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '12px' }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-8 left-1/2 w-0.5 bg-gray-500 transform -translate-x-1/2 rotate-12"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '8px' }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="absolute top-12 left-6 h-0.5 bg-gray-500"
                ></motion.div>
              </div>
            </motion.div>
          )}

          {/* Hatched with Chick */}
          {stage === 'hatched' && (
            <motion.div
              key="hatched"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className="mb-8"
            >
              <div className="relative">
                {/* Broken egg shell bottom */}
                <div className="w-20 h-12 bg-gradient-to-b from-white to-gray-100 rounded-b-full relative shadow-lg border border-gray-200">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white"></div>
                </div>
                
                {/* Simple chick */}
                <motion.div
                  initial={{ scale: 0, y: 5 }}
                  animate={{ scale: 1, y: -8 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
                >
                  <div className="w-12 h-12 bg-yellow-300 rounded-full relative">
                    {/* Eyes */}
                    <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                    <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                    {/* Beak */}
                    <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-orange-400 rounded-sm"></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Maya Appears */}
          {stage === 'maya-appears' && (
            <motion.div
              key="maya"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🤖</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mt-3"
              >
                <h3 className="text-lg font-semibold text-white mb-1">Maya is Ready!</h3>
                <p className="text-purple-200 text-sm">Your AI idea partner is ready to help.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl text-purple-300 mb-2">Initializing</h2>
          <h1 className="text-3xl font-bold text-white">{projectName}</h1>
        </motion.div>

        {/* Simple progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}