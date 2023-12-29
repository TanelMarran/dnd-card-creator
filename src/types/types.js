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
    simpleCardType: {
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
        default: () => ''
    },
}

export { SpellCardData, SimpleCardData }