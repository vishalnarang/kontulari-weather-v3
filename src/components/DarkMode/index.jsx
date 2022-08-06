import './../../darkTheme.css';
const setDark = () => {
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  document.documentElement.setAttribute("data-theme", "light");
};

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

const DarkMode = () => {
  return (
    <div className="toggle-theme-wrapper">
      <span>Light</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" onChange={toggleTheme} />
        <div className="slider round"></div>
      </label>
      <span>Dark</span>
    </div>
  );
};

export default DarkMode;
