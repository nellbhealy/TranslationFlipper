export const getTargetLemma = (word) => word.target[0].lemma;

export const getSourceLemma = (word) => word.source.lemma;

export const getExpressions = (word) => word.target[0].expressions;
