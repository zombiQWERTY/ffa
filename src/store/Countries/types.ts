export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, Omit<CountryName, "nativeName">>;
}

interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  name: CountryName;
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  cca2: string;
  capital: string[];
}
