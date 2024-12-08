import './UnsupportedBrowser.css';

const browsers = [
  {
    name: 'Google Chrome',
    url: 'https://www.google.com/chrome/',
    icon: `${process.env.PUBLIC_URL}/icons/chrome-icon.png`,
  },
  {
    name: 'Microsoft Edge',
    url: 'https://www.microsoft.com/edge',
    icon: `${process.env.PUBLIC_URL}/icons/edge-icon.png`,
  },
  {
    name: 'Safari',
    url: 'https://www.apple.com/safari/',
    icon: `${process.env.PUBLIC_URL}/icons/safari-icon.png`,
    note: ' (for macOS/iOS users)',
  },
];

export default function UnsupportedBrowser() {
  return (
    <div className="browser-container">
      <h1>Browser Not Supported</h1>
      <img
        className='teddy'
        src={`${process.env.PUBLIC_URL}/fat_animal_teddy/01-Hurt/FA_TEDDY_Hurt.gif`}
        alt="Animated Browser Icons"
      />
      <p className="error-message">We're sorry, but this web application is not supported on Firefox.</p>
      <p>Please use one of the following browsers:</p>
      <ul className="browser-list">
        {browsers.map((browser, index) => (
          <li key={index} className="browser-item">
            <a href={browser.url} target="_blank" rel="noopener noreferrer">
              <img
                src={browser.icon}
                alt={`${browser.name} Logo`}
                className="browser-icon"
              />
            </a>
            <a
              href={browser.url}
              target="_blank"
              rel="noopener noreferrer"
              className="browser-link"
            >
              {browser.name}
            </a>
            {browser.note && <span>{browser.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
