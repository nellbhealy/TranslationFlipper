export const getTargetLemma = (word) => word.targets[0].lemma;

export const getSourceLemma = (word) => word.source.lemma;

export const getExpressions = (word) => word.targets[0].expressions;
