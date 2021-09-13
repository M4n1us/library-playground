unique = {}
headCloseLine = ['Antwort:', 'Wählen Sie eine Antwort:', 'Wählen Sie eine oder mehrere Antworten:', 'Richtig', 'Falsch']
with open('fragen.txt', encoding='utf-8') as file:
    firstTime = True
    questionHead = False
    questionKey = ""
    questionBody = ""
    for line in file:
        split = line.split(")")
        # determine question start
        if len(split) > 0:
            try:
                number = int(split[0])
                if number < 100:
                    questionHead = True
                    questionBody = False
                    if firstTime:
                        firstTime = False
            except:
                pass
        # detect question end/answer start
        if questionHead:
            if any(x in line for x in headCloseLine):
                questionHead = False
                questionBody = True
                questionKey = ""




