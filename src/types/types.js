const SpellCardData = {
    meta: {
        type: Object,
        default: () => ({
            type: {
                level: 0,
                school: 'other',
            },
            castingTime: '1 action',
            range: 'self',
            components: {
                verbal: true,
                somatic: false,
                material: false,
                materialName: ''
            },
            duration: 'instantaneous',
            concentration: false,
        })
    },
    description: {
        type: String,
        default: () => ''
    },
    higherLevels: {
        type: String,
        default: () => ''
    },
}

const SimpleCardData = {
    description: {
        type: String,
        default: () => ''
    },
    simpleCardType: {
        type: String,
        default: () => 'Item'
    },
}

const StatCardData = {
    description: {
        type: String,
        default: () => ''
    },
    constitution: {
        type: Number,
        default: () => 10,
    },
    strength: {
        type: Number,
        default: () => 10,
    },
    dexterity: {
        type: Number,
        default: () => 10,
    },
    intelligence: {
        type: Number,
        default: () => 10,
    },
    wisdom: {
        type: Number,
        default: () => 10,
    },
    charisma: {
        type: Number,
        default: () => 10,
    },
    statCardType: {
        type: String,
        default: () => 'Humanoid'
    },
}

export { SpellCardData, SimpleCardData, StatCardData }