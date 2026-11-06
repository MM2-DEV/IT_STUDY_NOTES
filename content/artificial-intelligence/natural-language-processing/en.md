---
description: Natural language processing — key terms, NLU and NLG, the five phases, pipeline techniques, ambiguity, approaches and applications.
updated: 2026-11-06
---

### Definition of Natural Language Processing

Natural language processing (NLP) is the branch of artificial intelligence that enables computers to understand, analyse, interpret and generate human (natural) languages such as English or Bengali, in written or spoken form.

**A natural language** is a language that humans use to communicate with each other.

NLP combines computer science, linguistics and artificial intelligence. The input and output of an NLP system can be text or speech. NLP is needed whenever a person wants to give instructions to an intelligent system (such as a robot or a voice assistant) in ordinary language, or to receive answers from it in ordinary language.

Example: from the sentence "Ravi is happy with the new phone", an NLP system can:

1. Detect "Ravi" as a person.
2. Identify "phone" as an object.
3. Recognise the sentiment as positive.
4. Identify the topic as a product review.

### History of NLP

1. **1940s–1960: machine translation.** The **Georgetown–IBM experiment (1954)** automatically translated more than sixty Russian sentences into English. In **1957** Noam Chomsky published *Syntactic Structures* and introduced **generative grammar**, a rule-based description of sentence structure.
2. **1960–1980: rule-based, AI-flavoured systems:**
   1. **ELIZA** (Joseph Weizenbaum, MIT, 1964–1967): one of the first chatbots; it imitated a psychotherapist by keyword pattern matching.
   2. **SHRDLU** (Terry Winograd, 1968–1970): understood commands such as "pick up the green block" in a simulated world of blocks, combining syntax, semantics and reasoning.
   3. **LUNAR** (William A. Woods, early 1970s): one of the first natural-language question-answering systems; it answered questions about the Apollo 11 Moon rocks by translating them into database queries, using augmented transition networks.
   4. **Augmented transition networks (ATN)** for parsing, and **case grammar** (Charles J. Fillmore, 1968), which describes the roles of nouns in relation to a verb. In "Neha broke the mirror with the hammer", Neha is the agent, the mirror is the theme and the hammer is the instrument.
3. **1980s–1990s: statistical NLP.** Hand-written rules were replaced by machine learning from large text collections (corpora): n-gram models, hidden Markov models (HMMs) and decision trees, used for speech recognition and part-of-speech tagging.
4. **2000s–present: deep learning.** Word embeddings (Word2Vec), recurrent neural networks (RNNs) and transformers, and large pre-trained language models such as BERT and GPT, which power modern machine translation, chatbots and voice assistants (Siri, Alexa).

### Key Terms in NLP

1. **Phonology:** the study of how speech sounds are organised in a language.
2. **Morphology:** the study of how words are built from smaller meaningful units.
3. **Morpheme:** the smallest unit of meaning in a language. "Unhappiness" has three morphemes: un + happy + ness.
4. **Syntax:** the arrangement of words into grammatical sentences, and the structural role of each word.
5. **Semantics:** the meaning of words, and how words combine into meaningful phrases and sentences.
6. **Pragmatics:** how sentences are used and understood in different situations, and how the situation affects their interpretation.
7. **Discourse:** how the preceding sentences affect the interpretation of the next sentence.
8. **World knowledge:** general knowledge about the world, needed to understand what people mean.
9. **Lexicon:** the collection of words and phrases of a language.
10. **Corpus:** a large collection of texts used to train and test NLP systems (plural *corpora*).

### Components of NLP

NLP has two components:

1. Natural Language Understanding (NLU)
2. Natural Language Generation (NLG)

**Natural language understanding (NLU)** is the component of NLP that maps natural-language input into a useful internal representation by analysing its structure and meaning.

NLU extracts information such as concepts, entities, keywords, emotions, relations and semantic roles. Its tasks are:

1. Mapping the given input in natural language into useful representations.
2. Analysing the different aspects of the language (words, grammar, meaning, context).

**Natural language generation (NLG)** is the component of NLP that produces meaningful phrases and sentences in a natural language from an internal (non-linguistic) representation.

NLG has three steps:

1. **Text planning:** retrieving the relevant content from the knowledge base.
2. **Sentence planning:** choosing the words, forming meaningful phrases and setting the tone of the sentences.
3. **Text realisation:** mapping the sentence plan into the final sentence structure.

NLU is generally considered harder than NLG, because the input can be ambiguous, ungrammatical or incomplete, while the generator controls its own output.

| Point | NLU | NLG |
| --- | --- | --- |
| Task | Reading and interpreting language | Writing or generating language |
| Input | Natural language (text or speech) | Non-linguistic data (internal representation) |
| Output | Non-linguistic representation (meaning) | Natural language text or speech |
| Main difficulty | Ambiguity of the input | Choosing suitable content and words |
| Example | Understanding a customer's complaint | Writing a weather report from data |

### Phases of NLP

There are five phases (steps) in processing natural language:

![The five phases of natural language processing](/diagrams/artificial-intelligence/nlp-phases.svg)

1. **Lexical and morphological analysis:** divides the text into paragraphs, sentences and words, and analyses the structure of the words (their morphemes).
2. **Syntactic analysis (parsing):** checks the grammar and word order and shows how the words are related. "The school goes to the boy" is rejected by an English syntactic analyser.
3. **Semantic analysis:** finds the literal (dictionary) meaning of the text by mapping the syntactic structure to objects in the task domain, and rejects meaningless sentences such as "hot ice-cream".
4. **Discourse integration:** interprets a sentence using the sentences before it (and it affects the sentences after it). In "Rina bought a pen. It was blue.", "it" refers to the pen.
5. **Pragmatic analysis:** re-interprets what was said as what was actually meant, using real-world knowledge and the situation. "Can you open the door?" is understood as a request, not as a question about ability.

#### Syntactic Analysis with a Grammar

A parser checks a sentence against a **grammar**, a set of rules that describe valid sentences. A **context-free grammar (CFG)** has rules of the form `A → B C`, read "A consists of B followed by C". With the rules:

1. `S → NP VP` (a sentence is a noun phrase followed by a verb phrase)
2. `NP → Det N` (a noun phrase is a determiner followed by a noun)
3. `VP → V NP` (a verb phrase is a verb followed by a noun phrase)
4. `Det → the | a`, `N → boy | book`, `V → reads`

the sentence "The boy reads a book" is parsed as follows:

![Parse tree of "The boy reads a book"](/diagrams/artificial-intelligence/nlp-parse-tree.svg)

1. `S` is replaced by `NP VP`.
2. The first `NP` becomes `Det N` = "The boy".
3. `VP` becomes `V NP` = "reads" + `NP`.
4. The second `NP` becomes `Det N` = "a book".

All words are covered, so the sentence is grammatical. "Boy the book a reads" cannot be derived from these rules, so the parser rejects it. Parsing can be **top-down** (start from `S` and expand rules until the words are reached) or **bottom-up** (start from the words and combine them into larger constituents until `S` is reached).

### NLP Techniques (the NLP Pipeline)

An NLP system processes text through a series of steps called the NLP pipeline. The common techniques are:

1. **Sentence segmentation:** breaks a paragraph into separate sentences.
2. **Tokenization:** splits a sentence into smaller units called **tokens** (usually words and punctuation marks). "I like NLP." becomes `I`, `like`, `NLP`, `.`.
3. **Stop-word removal:** removes very common words that carry little meaning, such as "is", "and", "the" and "a", before statistical analysis.
4. **Stemming:** reduces words to a root form (stem) by cutting off suffixes, using rules; the stem need not be a real word.
5. **Lemmatization:** reduces words to their dictionary form (lemma), using a dictionary and the word's part of speech; the lemma is always a real word.
6. **Part-of-speech (POS) tagging:** labels each word with its part of speech (noun, verb, adjective, and so on). In "Google it on the Internet", "Google" is a verb, although it is usually a proper noun.
7. **Dependency parsing:** finds how the words of a sentence are related to each other (for example, which word is the subject of a verb).
8. **Named entity recognition (NER):** identifies names of people, organisations, places, dates and so on. In "Steve Jobs introduced the iPhone in San Francisco", it finds a person, a product and a place.
9. **Chunking:** groups individual words into larger phrases, such as noun phrases.
10. **Word sense disambiguation (WSD):** chooses the correct meaning of a word with several meanings from its context ("bank" of a river or a money bank).
11. **Sentiment analysis (opinion mining):** decides whether a text expresses a positive, negative or neutral opinion.

#### Stemming vs Lemmatization

The stems below are the real outputs of the Porter stemmer (NLTK 3.10):

| Word | Stem (Porter stemmer) | Lemma |
| --- | --- | --- |
| celebrates, celebrated, celebrating | celebr | celebrate |
| studies, studying | studi | study |
| running | run | run |
| better (adjective) | better | good |
| mice | — | mouse |

| Point | Stemming | Lemmatization |
| --- | --- | --- |
| Method | Cuts off suffixes by rules | Looks up the dictionary form, using the part of speech |
| Result | A stem, which may not be a real word ("studi") | A lemma, which is always a real word ("study") |
| Speed | Faster | Slower |
| Accuracy | Lower | Higher |
| Example tools | Porter stemmer | WordNet lemmatizer |

### Approaches to NLP

There are three main approaches:

1. **Rule-based approach:** hand-written grammar rules and dictionaries (for example, ELIZA and early translation systems). It is precise for a narrow domain but hard to extend.
2. **Statistical approach:** learns probabilities from a corpus, for example with n-gram models and hidden Markov models (used for POS tagging and speech recognition). It adapts to real language but needs a lot of data.
3. **Deep learning approach:** neural networks learn language patterns directly from very large corpora, for example recurrent neural networks (RNNs), long short-term memory networks (LSTMs) and transformers (the basis of BERT and GPT).

Computers process numbers, so modern systems first convert text into numerical vectors: earlier methods used word counts and word-importance scores, while **word embeddings** represent each word as a dense vector in which words with similar meanings are close together.

#### N-gram Language Model

**An n-gram** is a sequence of `n` consecutive words (or characters) in a text: a unigram is one word, a bigram two words and a trigram three words.

An n-gram language model estimates the probability of the next word from the previous `n − 1` words, using counts from a corpus. For a bigram model:

`P(wᵢ | wᵢ₋₁) = count(wᵢ₋₁ wᵢ) / count(wᵢ₋₁)`

and the probability of a sentence is the product of its bigram probabilities:

`P(w₁ … wₙ) = P(w₁ | <s>) × P(w₂ | w₁) × … × P(</s> | wₙ)`

where:

1. `wᵢ` is the `i`-th word of the sentence.
2. `count(wᵢ₋₁ wᵢ)` is the number of times the two words occur together in that order in the corpus.
3. `count(wᵢ₋₁)` is the number of times the first word occurs (as the first word of a pair).
4. `<s>` and `</s>` mark the start and end of a sentence.

**Example.** Corpus of three sentences: "I like tea", "I like coffee", "you like tea".

1. `P(I | <s>) = count(<s> I) / count(<s>) = 2/3`
2. `P(like | I) = count(I like) / count(I) = 2/2 = 1`
3. `P(tea | like) = count(like tea) / count(like) = 2/3`, and `P(coffee | like) = 1/3`
4. `P(</s> | tea) = count(tea </s>) / count(tea) = 2/2 = 1`
5. `P(<s> I like tea </s>) = 2/3 × 1 × 2/3 × 1 = 4/9 ≈ 0.444`

So after "like", the model predicts "tea" (probability 2/3) rather than "coffee" (1/3). This kind of prediction is used in speech recognition and predictive typing. (The values were checked with a short program.)

### Why NLP Is Difficult: Ambiguity

NLP is difficult mainly because natural language is **ambiguous**: one word or sentence can have several meanings. There are three main types of ambiguity:

1. **Lexical ambiguity:** a single word has two or more meanings. In "Manya is looking for a match", "match" can mean a partner, a game or a matchstick. "Board" can be a noun or a verb.
2. **Syntactic (structural) ambiguity:** a sentence can be parsed in two or more ways. In "I saw the girl with the binoculars", either I had the binoculars or the girl had them.
3. **Referential ambiguity:** it is unclear what a pronoun refers to. In "Kiran went to Sunita. She said, 'I am hungry.'", "she" can be Kiran or Sunita.

Other difficulties are idioms, sarcasm, spelling mistakes, new words, and the large number of languages and dialects.

### Natural Language vs Computer Language

| Point | Natural language | Computer (programming) language |
| --- | --- | --- |
| Vocabulary | Very large | Very limited |
| Understood easily by | Humans | Machines |
| Ambiguity | Ambiguous | Unambiguous |
| Grammar | Flexible; has many exceptions | Strict, formally defined |
| Origin | Evolved naturally | Designed deliberately |

### Applications of NLP

1. **Machine translation:** translating text or speech from one language to another (Google Translate).
2. **Speech recognition:** converting spoken words into text (dictation, voice commands).
3. **Chatbots and voice assistants:** customer-support chatbots, Siri, Alexa and Google Assistant.
4. **Question answering:** systems that return exact answers to questions asked in natural language.
5. **Sentiment analysis:** finding opinions in reviews and social-media posts.
6. **Spam detection and text classification:** filtering unwanted e-mail and sorting documents by topic.
7. **Spelling and grammar correction, auto-complete and predictive typing.**
8. **Information extraction:** extracting structured data (names, dates, amounts) from unstructured documents.
9. **Text summarisation:** producing a short version of a long document.
10. **Natural-language interfaces to databases:** translating questions into database queries.

### Advantages and Disadvantages of NLP

Advantages:

1. Users can communicate with computers in their own language.
2. Users can ask questions about a subject and get a direct answer within seconds.
3. It saves time by processing very large amounts of text automatically.
4. It improves the efficiency and accuracy of documentation and of finding information in large databases.

Disadvantages:

1. It may fail to understand context, sarcasm or ambiguous sentences.
2. Its output can be unpredictable or wrong.
3. A system is often built for one task or domain and does not adapt easily to a new one.
4. Modern statistical and deep-learning systems need very large amounts of training data and computing power.

## References {#references}

- TutorialsPoint — [Natural Language Processing](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_natural_language_processing.htm), accessed 2026-11-06.
- TpointTech — [NLP Tutorial](https://www.tpointtech.com/nlp) and [What is Natural Language Processing in Artificial Intelligence?](https://www.tpointtech.com/what-is-natural-language-processing-in-artificial-intelligence), accessed 2026-11-06.
- GeeksforGeeks — [Introduction to Natural Language Processing (NLP)](https://www.geeksforgeeks.org/nlp/natural-language-processing-overview/), accessed 2026-11-06.
- Programiz has no page on natural language processing.
- Wikipedia — [ELIZA](https://en.wikipedia.org/wiki/ELIZA), [Georgetown–IBM experiment](https://en.wikipedia.org/wiki/Georgetown%E2%80%93IBM_experiment) and [William Aaron Woods](https://en.wikipedia.org/wiki/William_Aaron_Woods) (LUNAR), accessed 2026-11-06.
- Stemmer outputs were produced with the Porter stemmer of NLTK 3.10.4 (Python).

Issues found on the reference websites and how they were resolved:

1. TutorialsPoint lists "Semantic analysis — determines the sentiment expressed in a piece of text" among NLP techniques; that describes sentiment analysis. Semantic analysis finds the meaning of the text, as TutorialsPoint itself says in its "Steps in NLP".
2. TpointTech says that an augmented transition network "is a finite state machine that is capable of recognizing regular languages"; ATNs add registers and recursion to transition networks so that they can parse full sentence structures, which is more than regular languages. That sentence was not used.
3. TpointTech's lemmatization example reduces "intelligence, intelligent and intelligently" to the single lemma "intelligent"; a lemmatizer keeps the noun "intelligence" as its own lemma. Different examples are used here.
4. TpointTech says that stemming reduces "celebrates, celebrated, celebrating" to "celebrate"; the Porter stemmer actually produces "celebr" (checked with NLTK), which shows that stems need not be real words. "Celebrate" is the lemma.
5. TpointTech describes lexical analysis as scanning "the source code"; that is compiler wording. In NLP, lexical analysis divides natural-language text into paragraphs, sentences and words.
6. TpointTech's history page calls ELIZA "the first major achievement of Asia"; ELIZA was developed at MIT in the United States (Wikipedia).
