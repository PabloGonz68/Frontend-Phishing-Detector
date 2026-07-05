import { motion } from "framer-motion";

export default function BackgroundOcean() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep sea creature 1 - Jellyfish */}
      <motion.div
        className="absolute w-32 h-32 blur-[8px] opacity-20 text-cyber-cyan"
        initial={{ x: "-10vw", y: "90vh" }}
        animate={{
          x: ["-10vw", "30vw", "110vw"],
          y: ["90vh", "40vh", "-20vh"],
          scale: [1, 1.1, 0.9],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path d="M256,0C149.969,0,64,85.969,64,192v128c0,17.672,14.328,32,32,32s32-14.328,32-32v-32h256v32c0,17.672,14.328,32,32,32 s32-14.328,32-32V192C448,85.969,362.031,0,256,0z" />
          <path d="M128,384c-17.672,0-32,14.328-32,32v64c0,17.672,14.328,32,32,32s32-14.328,32-32v-64C160,398.328,145.672,384,128,384z" />
          <path d="M256,384c-17.672,0-32,14.328-32,32v64c0,17.672,14.328,32,32,32s32-14.328,32-32v-64C288,398.328,273.672,384,256,384z" />
          <path d="M384,384c-17.672,0-32,14.328-32,32v64c0,17.672,14.328,32,32,32s32-14.328,32-32v-64C416,398.328,401.672,384,384,384z" />
        </svg>
      </motion.div>

      {/* Deep sea creature 2 - Shark/Big Fish silhouette */}
      <motion.div
        className="absolute w-64 h-32 blur-[6px] opacity-15 text-slate-400"
        initial={{ x: "110vw", y: "30vh", scaleX: -1 }}
        animate={{
          x: ["110vw", "40vw", "-20vw"],
          y: ["30vh", "35vh", "20vh"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 512 512" fill="currentColor">
          <path d="M500.5,233.1c-16.7-7-48.5-16.6-86.4-18.4c-9.5-18.9-22.3-37-37.4-52.9c-27.1-28.5-59.5-47.3-89.9-52.1 c-10-1.6-18.5-2.1-25.2-2.3c-2.3,6.2-5,13.7-8,22.1c-13.8,38.8-30.8,86.6-32.9,94.3c-18.3,1.4-38,3.9-58.8,8.2 C92,246.5,41.4,272.7,14,290.7c-5.7,3.7-4.3,12,2.2,14.3c27.5,9.6,56.7,16.2,85.6,18.9c25,2.4,49.8,2,72.6-1.1 c9.1,19.3,19.9,39.1,31.8,59.3c8.9,15.1,18.1,30.3,27,45.2c1.9,3.1,6.5,3,8.3-0.2c8.9-15.3,18.3-31,27.5-46.7 c9.8-16.6,19-33.1,27.1-49.3c26.6-8,54.8-21.3,80.7-39C425.2,275,470,250.7,508.8,242C513.7,240.9,513,238.4,500.5,233.1z"/>
        </svg>
      </motion.div>

      {/* Deep sea creature 3 - Small school of detailed fish */}
      <motion.div
        className="absolute w-[400px] h-48 blur-[4px] opacity-[0.08] text-white"
        initial={{ x: "-30vw", y: "60vh" }}
        animate={{
          x: ["-30vw", "110vw"],
          y: ["60vh", "75vh", "55vh", "65vh"],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 1024 1024" fill="currentColor">
          {/* Fish 1 */}
          <path d="M341.3,512c0,0,85.3-42.7,170.7-42.7s170.7,42.7,170.7,42.7c0,0-85.3,42.7-170.7,42.7S341.3,512,341.3,512z M341.3,512c-42.7,0-85.3-21.3-85.3-21.3v42.7C256,533.3,298.7,512,341.3,512z" />
          {/* Fish 2 (Offset) */}
          <g transform="translate(150, -80)">
             <path d="M341.3,512c0,0,85.3-42.7,170.7-42.7s170.7,42.7,170.7,42.7c0,0-85.3,42.7-170.7,42.7S341.3,512,341.3,512z M341.3,512c-42.7,0-85.3-21.3-85.3-21.3v42.7C256,533.3,298.7,512,341.3,512z" />
          </g>
          {/* Fish 3 (Offset) */}
          <g transform="translate(-100, 60)">
             <path d="M341.3,512c0,0,85.3-42.7,170.7-42.7s170.7,42.7,170.7,42.7c0,0-85.3,42.7-170.7,42.7S341.3,512,341.3,512z M341.3,512c-42.7,0-85.3-21.3-85.3-21.3v42.7C256,533.3,298.7,512,341.3,512z" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
