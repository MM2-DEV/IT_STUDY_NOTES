---
description: Expert systems — components, inference, types, examples, shells, development, advantages and limits — and computer vision — working, tasks, convolution and applications.
updated: 2026-11-06
---

### Definition of Expert System

An expert system (ES) is a computer program that solves complex problems in a specific domain at the level of a human expert, by applying reasoning to a knowledge base of facts and rules obtained from experts.

Expert systems are one of the main research areas of AI. They were introduced by researchers at the Computer Science Department of Stanford University. An expert system imitates the decision-making of a human expert, but it does not think like a human: it applies its stored rules and logic. For example, a medical expert system can analyse a patient's symptoms and propose possible diagnoses, and a financial expert system can analyse market data to give investment advice.

Expert systems are important because they:

1. **Preserve knowledge:** the knowledge of experts is not lost when they retire or leave.
2. **Improve decisions:** they give consistent, objective advice based on rules.
3. **Save time and cost:** they automate work that would otherwise need a specialist.
4. **Increase access:** non-experts can obtain expert-level guidance.

### Characteristics of Expert Systems

1. **High performance:** solves complex problems in its domain as well as, or better than, a human expert.
2. **Understandable:** explains its reasoning, so the user can follow and trust it.
3. **Reliable:** gives correct and consistent results.
4. **Highly responsive:** gives answers quickly.

### Capabilities of Expert Systems

Expert systems are capable of:

1. Advising.
2. Instructing and assisting humans in decision-making.
3. Demonstrating.
4. Deriving a solution.
5. Diagnosing.
6. Explaining.
7. Interpreting input.
8. Predicting results.
9. Justifying a conclusion.
10. Suggesting alternative options for a problem.

Expert systems are incapable of:

1. Substituting for human decision-makers.
2. Possessing human capabilities (common sense, intuition, emotions).
3. Producing accurate output from an inadequate knowledge base.
4. Refining their own knowledge.

### Components of an Expert System

An expert system has three main components:

1. Knowledge base
2. Inference engine
3. User interface

Most expert systems also have an explanation module and a knowledge acquisition module.

![Architecture of an expert system](/diagrams/artificial-intelligence/expert-system-architecture.svg)

#### 1. Knowledge Base

The **knowledge base** is the component of an expert system that stores the domain-specific, high-quality knowledge (facts and rules) needed to solve problems in the domain.

The success of an expert system depends mainly on the accuracy, precision and completeness of its knowledge base; wrong or outdated knowledge gives wrong conclusions. Data is a collection of facts; information is data organised about the task domain; data, information and past experience together are called **knowledge**.

The knowledge base stores two kinds of knowledge:

1. **Factual knowledge:** information that is widely accepted by experts and scholars in the domain (for example, "fever is a symptom of infection").
2. **Heuristic knowledge:** knowledge from practice, good judgement, the ability to evaluate and to make educated guesses ("rules of thumb").

Knowledge is usually represented as **IF–THEN** (production) rules, for example `IF fever AND cough THEN possible flu`; it can also be represented with frames and other methods.

#### 2. Inference Engine

The **inference engine** is the reasoning component of an expert system that applies the rules of the knowledge base to the known facts to derive new facts and reach a conclusion.

In a rule-based expert system the inference engine:

1. Matches the facts (stored in working memory) with the rules.
2. Applies rules repeatedly to the facts, including facts obtained from earlier rule applications.
3. Adds new knowledge to the knowledge base if required.
4. Resolves conflicts when several rules can be applied (conflict resolution).

It uses two reasoning strategies:

1. **Forward chaining** (data-driven) answers "What can happen next?". It starts from the known facts and applies rules to reach a conclusion. Example: predicting the share market as an effect of changes in interest rates.
2. **Backward chaining** (goal-driven) answers "Why did this happen?". It starts from a possible conclusion and works backward to find facts that support it. Example: diagnosing blood cancer from test results.

Both strategies are explained with worked examples in [Knowledge Organization and Manipulation](/topics/artificial-intelligence/knowledge-representation#knowledge-organization-and-manipulation), and the matching process in [Matching Techniques](/topics/artificial-intelligence/search-strategies-and-game-playing#matching-techniques).

#### 3. User Interface

The **user interface** is the component that provides interaction between the user and the expert system: the user enters problems, data and answers, and receives advice and explanations.

The user does not need to be an expert in AI. The interface may use natural language, menus, a graphical interface, a web page or a chatbot. An efficient user interface should:

1. Help users accomplish their goals in the shortest possible way.
2. Fit the users' existing or desired work practices.
3. Adapt its technology to the users' requirements, not the other way round.
4. Make efficient use of user input.

#### 4. Explanation Module

The **explanation module** is the component that explains how the expert system reached a conclusion and why it asked a particular question.

The explanation can be shown as natural-language text on screen, as spoken narration or as a list of the rule numbers that were applied. Example: "Diagnosis: flu — because fever, cough and body pain match rule R12." Explanations make the system's conclusions easy to check and trust.

#### 5. Knowledge Acquisition Module

**Knowledge acquisition** is the process of gathering knowledge from human experts and other sources and organising it into the knowledge base.

The **knowledge engineer** is the person who acquires knowledge from the domain expert (by interviewing, recording and observing the expert at work), organises it as IF–THEN rules and monitors the development of the expert system.

A knowledge acquisition module also keeps the knowledge base up to date with new facts and rules.

### How an Expert System Works

1. The user enters input (symptoms, measurements, conditions) through the user interface.
2. The input is stored as facts in working memory.
3. The inference engine searches the knowledge base for rules whose conditions match these facts.
4. It applies the rules to infer new facts.
5. Steps 3 and 4 repeat until a conclusion or recommendation is reached.
6. The explanation module shows how the result was obtained.

Example: a patient enters fever, cough and fatigue; the inference engine applies the rules of the knowledge base and proposes pneumonia; the explanation module states that fever, cough and an abnormal chest X-ray led to the diagnosis.

### Types of Expert Systems

There are five types of expert systems, classified by how knowledge is represented and processed:

1. **Rule-based expert systems:** knowledge is stored as IF–THEN rules written by domain experts. They are the most common type, easy to understand and transparent. Example: MYCIN.
2. **Frame-based expert systems:** knowledge is stored in frames, structured units like objects in programming, with attributes, values and relationships to other frames.
3. **Fuzzy logic expert systems:** they reason with degrees of truth between 0 and 1 instead of only true or false, so they handle vague and uncertain knowledge. Example: control of washing machines and air conditioners.
4. **Neural network based expert systems:** they use artificial neural networks to recognise patterns and learn from data, for example in image and speech recognition.
5. **Neuro-fuzzy expert systems:** they combine the learning ability of neural networks with the reasoning of fuzzy logic, for example in financial forecasting and automatic control.

### Examples of Expert Systems

1. **MYCIN:** a medical expert system developed in the 1970s that diagnosed bacterial infections (such as meningitis and bacteraemia) and recommended antibiotics. It used backward chaining and asked doctors questions about symptoms and test results. It was never used clinically, but it shaped later medical expert systems.
2. **DENDRAL:** one of the earliest AI systems in chemistry; it analysed mass-spectrometry data to identify the structure of chemical compounds.
3. **R1/XCON:** developed for Digital Equipment Corporation (DEC) in the late 1970s; it configured computer systems by selecting suitable hardware and software components from customers' orders. It reduced errors and saved DEC millions of dollars.
4. **PXDES:** an expert system that helped diagnose the type and stage of lung cancer.
5. **CaDet:** a clinical decision-support system for the early detection of cancer.

### Expert System Technology

1. **Development environment:** workstations, minicomputers and mainframes; symbolic programming languages such as **LISP** (LISt Processing) and **Prolog** (PROgrammation en LOGique); large databases.
2. **Tools:** editors and debugging tools with multiple windows, which allow rapid prototyping and have built-in definitions of models, knowledge representation and inference design.
3. **Shells:** an expert system shell is an expert system without a knowledge base; it provides the inference engine, user interface, explanation facility and knowledge acquisition facility, so a developer only has to add the domain knowledge. Examples:
   1. **JESS** (Java Expert System Shell), which provides a Java API for building expert systems.
   2. **Vidwan**, developed at the National Centre for Software Technology, Mumbai, in 1993, which encodes knowledge as IF–THEN rules.

### Development of an Expert System

Developing an expert system is an iterative process with six steps:

1. **Identify the problem domain:** check that the problem is suitable for an expert system, find the domain experts and establish the cost-effectiveness of the system.
2. **Design the system:** choose the expert system technology, decide how it will be integrated with other systems and databases, and decide how the domain knowledge will be represented.
3. **Develop the prototype:** the knowledge engineer acquires the domain knowledge from the expert and represents it as IF–THEN rules.
4. **Test and refine the prototype:** the knowledge engineer tests it with sample cases to find deficiencies, and end users test it.
5. **Develop and complete the system:** test its interaction with users, databases and other information systems, document the project and train the users.
6. **Maintain the system:** review and update the knowledge base regularly, and add interfaces to other systems as they change.

### Applications of Expert Systems

| Domain | Example uses |
| --- | --- |
| Design | Camera lens design, automobile design |
| Medicine | Diagnosing diseases from observed data, recommending treatment |
| Monitoring | Continuously comparing data with expected behaviour, for example detecting leaks in a long petroleum pipeline |
| Process control | Controlling a physical process based on monitoring |
| Knowledge domain (fault finding) | Finding faults in vehicles and computers; technical support |
| Finance and commerce | Detecting fraud and suspicious transactions, credit scoring, stock trading, airline and cargo scheduling |
| Space | NASA's Remote Agent diagnosed problems and controlled the Deep Space 1 spacecraft without constant human oversight |

### Advantages of Expert Systems

1. **Availability:** easily available, because software can be mass-produced.
2. **Consistency:** decisions are not affected by emotions or fatigue.
3. **Low cost:** reasonable production cost compared with a human expert.
4. **Knowledge preservation:** expert knowledge is kept when experts leave.
5. **Speed:** they reduce the time and work needed to solve problems.
6. **Scalability:** once built, they can serve many users in many places at the same time.
7. **Low error rate:** fewer errors than humans.
8. **Education:** they help newcomers learn a specialised field.
9. **Reduced risk:** they can work in environments dangerous to humans.
10. **Steady response:** they work steadily without becoming emotional, tense or tired.
11. **Explanation:** they can explain how a conclusion was reached.

### Limitations of Expert Systems

1. **No common sense:** they lack human intuition and general knowledge.
2. **Cannot learn by themselves:** their knowledge changes only when it is updated by people.
3. **High development cost and time:** knowledge acquisition, programming and maintenance are expensive.
4. **Difficult knowledge acquisition:** experts often find it hard to state their knowledge as rules.
5. **Narrow domain:** they work well only in their own domain.
6. **Difficult maintenance:** updating the knowledge base needs knowledge engineers.
7. **Missing or uncertain data:** they struggle when information is incomplete or ambiguous.
8. **No emotional intelligence:** they cannot show empathy, for example in sensitive customer-service situations.

### Expert System vs Traditional System

| Point | Expert system | Traditional (conventional) system |
| --- | --- | --- |
| Purpose | Simulates the reasoning and decisions of a human expert in a domain | Performs predefined tasks with fixed algorithms |
| Knowledge | Knowledge base of facts, rules and heuristics, separate from the inference engine | Knowledge and processing are mixed in the program code |
| Processing | Inference with forward or backward chaining | Executes instructions exactly as coded |
| Explanation | Can explain its reasoning | Cannot explain its results |
| Changes | Update the knowledge base | Reprogram the system |
| Uncertain or incomplete data | Can handle it to some degree (heuristics, fuzzy logic) | Cannot handle it |
| Learning | No self-learning; manual updates | No learning |

### Definition of Computer Vision

Computer vision (CV) is the branch of artificial intelligence that enables computers to acquire, analyse and understand images and videos, so that they can identify objects, recognise patterns and make decisions from visual data.

Computer vision gives machines a sense similar to human sight. AI supplies the data analysis and decision-making, and computer vision supplies visual understanding. It is used in healthcare, vehicles, security, agriculture and entertainment.

### How Computer Vision Works

Computer vision systems learn from large amounts of data. For example, to recognise a dog, a system is trained with a very large number of images of different dog breeds until it can distinguish dogs from other objects. The main technologies are:

1. **Machine learning:** algorithms that let the computer learn from visual data without being explicitly programmed for each case.
2. **Deep learning and convolutional neural networks (CNNs):** a CNN breaks an image into pixels, applies convolutions (filters) to find features, and predicts labels.
3. **Recurrent neural networks (RNNs):** used for video, to relate a series of frames to each other.

![Steps of a computer vision system](/diagrams/artificial-intelligence/cv-pipeline.svg)

A computer vision system works in five steps:

1. **Image acquisition:** images or videos are captured by cameras or other sensors; their quality affects the accuracy of the system.
2. **Pre-processing:** the raw images are cleaned and enhanced (noise removal, brightness and contrast adjustment, sharpening).
3. **Feature extraction (detection):** important features such as edges, shapes, colours and textures are found.
4. **Pattern recognition:** the features are compared with learned patterns, using machine-learning models, to recognise and classify objects.
5. **Decision-making:** the system acts on the result, for example recognising a face, detecting an obstacle or identifying a traffic sign.

#### Hardware of a Computer Vision System

1. Power supply.
2. Image acquisition device, such as a camera.
3. Processor.
4. Software.
5. Display device for monitoring the system.
6. Accessories, such as camera stands, cables and connectors.

#### Digital Images and Convolution

**A digital image** is a grid of pixels (picture elements), each storing a colour or brightness value.

A pixel stores one brightness value (for example, 0 to 255 in an 8-bit greyscale image) or three values (red, green, blue) in a colour image.

**Storage size of an uncompressed image:**

`Size (bytes) = width × height × bytes per pixel`

Example: a 640 × 480 colour image with 3 bytes per pixel needs `640 × 480 × 3 = 921,600` bytes; a 1920 × 1080 (Full HD) colour image needs `1920 × 1080 × 3 = 6,220,800` bytes, about 6.2 MB (5.93 MiB). A video at 30 frames per second produces 30 such images every second, which is why computer vision needs fast processing.

**Convolution** is the basic operation of feature extraction and of CNNs: a small grid of weights called a **kernel** (filter) slides over the image, and at each position the overlapping pixel values are multiplied by the weights and added:

`Output(i, j) = Σₐ Σᵦ Image(i + a, j + b) × Kernel(a, b)`

where `a` and `b` run over the rows and columns of the kernel.

Example: detect a vertical edge in a 4 × 5 image whose left part is bright (10) and right part is dark (0), with a 3 × 3 vertical-edge kernel:

| Image | | | | | | Kernel | | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 10 | 10 | 10 | 0 | 0 | | 1 | 0 | −1 |
| 10 | 10 | 10 | 0 | 0 | | 1 | 0 | −1 |
| 10 | 10 | 10 | 0 | 0 | | 1 | 0 | −1 |
| 10 | 10 | 10 | 0 | 0 | | | | |

1. At the first position (columns 1–3), every row gives `10×1 + 10×0 + 10×(−1) = 0`, so the output is `0 + 0 + 0 = 0`: no edge in a uniform area.
2. At the second position (columns 2–4), every row gives `10×1 + 10×0 + 0×(−1) = 10`, so the output is `30`.
3. At the third position (columns 3–5), every row gives `10×1 + 0×0 + 0×(−1) = 10`, so the output is `30`.

The output (2 × 3) is `[0, 30, 30]` in both rows: the large values mark the place where brightness changes, that is, the vertical edge. (Checked with a short program.) A CNN learns the weights of many such kernels from training data.

### Tasks of Computer Vision

1. **Image classification:** assigns an image to a predefined category (for example, "cat" or "dog").
2. **Object detection:** identifies and locates objects in an image, usually with bounding boxes.
3. **Image segmentation:** divides an image into meaningful regions, labelling each pixel.
4. **Face detection and recognition:** finds faces and identifies or verifies people (for example, unlocking a phone).
5. **Optical character recognition (OCR):** converts text in scanned documents, images and signboards into editable text.
6. **Pose estimation:** tracks the positions of the parts of the human body.
7. **Position estimation:** estimates the position of an object relative to the camera, such as the position of a tumour in the body.
8. **Medical image analysis:** detects diseases in X-ray, CT and MRI images.

### Applications of Computer Vision

1. **Agriculture:** sowing, harvesting, weeding, plant-health and pest detection.
2. **Autonomous vehicles:** recognising roads, lanes, traffic signs, pedestrians and obstacles.
3. **Face recognition and security:** surveillance and access control.
4. **Healthcare:** analysing medical images in radiology, pathology and ophthalmology.
5. **Manufacturing:** quality inspection, defect detection and predictive maintenance.
6. **Retail:** monitoring shopping activity and preventing loss.
7. **Transport:** detecting traffic-signal violations, speeding and wrong-side driving.
8. **Entertainment and fitness:** gaming, augmented reality, human-pose tracking.
9. **Education:** evaluating learning activity and engagement.

### Advantages and Challenges of Computer Vision

Advantages:

1. Processes large volumes of images and video quickly, even in real time.
2. Gives consistent results without fatigue in repetitive tasks.
3. Achieves high accuracy in tasks such as object detection and medical image analysis.
4. Reduces manual effort by automating visual inspection and monitoring.

Challenges (limitations):

1. **Variability of images:** lighting, shadows, glare, angle and background affect accuracy.
2. **Perspective and scale:** an object looks different at different distances and angles.
3. **Occlusion:** partially hidden objects are hard to detect.
4. **Context:** identifying objects is easier than understanding the relationships between them and the whole scene.
5. **Data needs:** training requires large amounts of high-quality labelled data, and performance drops on images unlike the training data.

## References {#references}

- TutorialsPoint — [Expert Systems](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_expert_systems.htm), [Applications of Expert Systems](https://www.tutorialspoint.com/artificial_intelligence/ai_applications_of_expert_systems.htm), [Advantages and Limitations of Expert Systems](https://www.tutorialspoint.com/artificial_intelligence/ai_advantages_limitations_of_expert_systems.htm), [Computer Vision](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_computer_vision.htm), accessed 2026-11-06.
- TpointTech — [What is an Expert System?](https://www.tpointtech.com/expert-systems-in-artificial-intelligence), [Expert vs Traditional Systems in AI](https://www.tpointtech.com/expert-vs-traditional-systems-in-ai), accessed 2026-11-06. TpointTech has no general computer-vision page in its AI tutorial.
- GeeksforGeeks — [Expert Systems in AI](https://www.geeksforgeeks.org/artificial-intelligence/expert-systems/), [Computer Vision — Introduction](https://www.geeksforgeeks.org/computer-vision/computer-vision-introduction/), accessed 2026-11-06.
- Programiz has no page on expert systems or computer vision.
- The image-size formula and the convolution example are standard image-processing calculations, checked with a short program.

Issues found on the reference websites and how they were resolved:

1. TpointTech says that in backward chaining the system "becomes inductive"; backward chaining is goal-driven deductive reasoning (it proves a goal from rules and facts), as TutorialsPoint and GeeksforGeeks describe it.
2. TutorialsPoint's applications table lists "conduction medical operations on humans" in the medical domain; expert systems diagnose and recommend treatment, so that phrase was not used.
3. TutorialsPoint and TpointTech differ on the number of components (three in TutorialsPoint; five in TpointTech and GeeksforGeeks). Both are given here: three main components, plus the explanation and knowledge acquisition modules found in most systems.
