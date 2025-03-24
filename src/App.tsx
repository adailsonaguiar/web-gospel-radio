import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Station {
  id: number;
  name: string;
  url: string;
  logo?: string;
}

const stations: Station[] = [
  { id: 1, name: "Rádio Paz Palmas", url: "https://player.radiopazpalmas.com.br/stream", logo: "https://radiopazpalmas.com.br/wp-content/uploads/2024/05/LOGO-RADIO-PAZ-FM-2024-e1715718699804.png" },
  { id: 3, name: "Gospel FM - Araras SP", url: "https://www.appradio.app:8120/live", logo: "https://gospel.fm.br/content/uploads/2016/11/logo.png" },
];

export default function RadioApp() {
  const [currentStation, setCurrentStation] = useState<Station>(stations[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement>(new Audio(currentStation.url));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = currentStation.url;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeStation = (station: Station) => {
    setCurrentStation(station);
    if (isPlaying) {
      audioRef.current.src = station.url;
      audioRef.current.play();
    }
  };

  const adjustVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">Radio Gospel FM</h1>
      </header>
      <div className="flex flex-col items-center w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        {currentStation.logo && (
          <img src={currentStation.logo} alt={currentStation.name} className="w-52 h-w-52 mb-4 object-contain" />
        )}
        <h2 className="text-xl font-semibold mb-4">{currentStation.name}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400">
              {volume > 0 ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={adjustVolume}
              className="w-24 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-3 text-center">Stations</h3>
        <ul className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700">
          {stations.map((station) => (
            <li
              key={station.id}
              className={`p-3 cursor-pointer hover:bg-gray-700 transition text-center ${
                currentStation.id === station.id ? "bg-blue-600" : ""
              }`}
              onClick={() => changeStation(station)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}