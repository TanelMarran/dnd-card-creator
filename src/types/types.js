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
    proficiency: {
        type: Number,
        default: () => 2,
    },
    armorClass: {
        type: String,
        default: () => '12',
    },
    speed: {
        type: Number,
        default: () => 30,
    },
    constitution: {
        type: Number,
        default: () => 10,
    },
    constitutionSave: {
        type: Boolean,
        default: () => false,
    },
    strength: {
        type: Number,
        default: () => 10,
    },
    strengthSave: {
        type: Boolean,
        default: () => false,
    },
    dexterity: {
        type: Number,
        default: () => 10,
    },
    dexteritySave: {
        type: Boolean,
        default: () => false,
    },
    intelligence: {
        type: Number,
        default: () => 10,
    },
    intelligenceSave: {
        type: Boolean,
        default: () => false,
    },
    wisdom: {
        type: Number,
        default: () => 10,
    },
    wisdomSave: {
        type: Boolean,
        default: () => false,
    },
    charisma: {
        type: Number,
        default: () => 10,
    },
    charismaSave: {
        type: Boolean,
        default: () => false,
    },
    proficiencies: {
        type: Array,
        default: () => []
    },
    statCardType: {
        type: String,
        default: () => 'Humanoid'
    },
}

export { SpellCardData, SimpleCardData, StatCardData }