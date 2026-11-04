// The same config object, checked against the Settings it must satisfy.
type Settings = { port: number; host: string };

const config = {
  port: 8080,
  hsot: "localhost",
} satisfies Settings;

console.log(config.port);
