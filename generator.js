const { NlpManager } = require("node-nlp");
const { entities, phrases } = require("./data.js");

const manager = new NlpManager(
    {
        languages: ["en"],
        autoSave: false
    }
);
entities.forEach(
    element => manager.addNamedEntityText(
        element.items.forEach(
            item => manager.addNamedEntityText(
                element.tag,
                item,
                ["en"],
                [item]
            )
        )
    )
);
phrases.forEach(phrase => {
    phrase.triggers.forEach(
        trigger => manager.addDocument(
            "en",
            trigger,
            phrase.tag
        )
    );
    phrase.answers.forEach(
        answer => manager.addAnswer(
            "en",
            phrase.tag,
            answer
        )
    );
});
(async () => {
    await manager.train();
    manager.save();
})();
