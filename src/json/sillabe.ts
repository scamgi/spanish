interface ParolaESillabe {
    parola: string,
    sillabe: string
};

let sillabe: ParolaESillabe[] = [
    {
        parola: "Caiga",
        sillabe: "cai - ga"
    },
    {
        parola: "Fuera",
        sillabe: "fue - ra"
    },
    {
        parola: "Fuimos",
        sillabe: "fui - mos"
    },
    {
        parola: "Canción",
        sillabe: "can - ción"
    },
];

export default sillabe;
export type { ParolaESillabe };