type LevelPinProps = {
  level: number;
  dangerLevel?: number;
  warningLevel?: number;
};

function LevelPin({
  level,
  dangerLevel = 90,
  warningLevel = 70,
}: LevelPinProps) {
  if (level > dangerLevel) {
    return <div className="bg-red-500 rounded-full size-3"></div>;
  } else if (level > warningLevel) {
    return <div className="bg-yellow-500 rounded-full size-3"></div>;
  }
  return <div className="bg-green-500 rounded-full size-3"></div>;
}

export default LevelPin;
