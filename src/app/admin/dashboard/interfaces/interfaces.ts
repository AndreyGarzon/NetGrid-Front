export interface Character {
    id:       string;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Location;
    location: Location;
    image:    string;
    episode:  string[];
    url:      string;
    created:  Date;
}

export type OptCharacter = Partial<Character>;
export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}


export interface Location {
    name: string;
    url:  string;
}
export interface CharactersResponse {
    info:    Info;
    results: Character[];
}

export interface FavoriteFetch {
    id_usuario:    number;
    ref_api: string | undefined;
}



export interface FavoriteResponse{
    status: string;
    message: string;
    data:Favorite[] ;
}

export interface Favorite {
    id:         number;
    created_at: Date;
    updated_at: Date;
    id_usuario: number;
    ref_api:    string  ;
}


export type OptFavorite = Partial<Favorite>;
