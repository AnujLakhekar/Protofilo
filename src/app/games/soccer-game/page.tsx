const SoccerGamePage = () => {
  return (
    <div className="soccer-game fixed inset-0 z-20 h-dvh w-screen overflow-hidden bg-black">
      <iframe
        src="/web/soccer.html"
        title="Godot Soccer Game"
        className="block h-full w-full border-0"
      />
    </div>
  );
};

export default SoccerGamePage;