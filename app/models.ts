export type Type = {
    slot: number
    type: {
        name: string,
        url: string
    }
}

export type Stat = {
    base_stat: number
    effort: number
    stat: {
        name: string,
        url: string
    }
}

export type Sprite = {
    front_default: string
}

export type Pokemon = {
    id: number
    name: string
    abilities: string[]
    sprites: Sprite
    stats: Stat[]
    types: Type[]
}

export type Trainer = {
    name: string
    pokemon: Pokemon[]
}