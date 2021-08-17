import csv

with open('merged.csv', encoding='utf-8') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    out = {}
    dupes = {}
    firstPass = True
    for row in spamreader:
        if firstPass:
            firstPass = False
            continue
        nachname = "".join(row[0].lower().split())
        vorname = "".join(row[1].lower().split())
        straße = "".join(row[2].lower().split())
        plz = "".join(row[4].split())
        ort = "".join(row[5].lower().split())
        key = "%s_%s_%s_%s_%s" % (nachname, vorname, straße, plz, ort)
        if key in out:
            dupes[key] = row
        else:
            out[key] = row

    print(len(dupes))
    print(len(out))
    with open('out.csv', 'w', newline='') as outfile:
        spamwriter = csv.writer(outfile, delimiter=',',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)

        for key, value in out.items():
            spamwriter.writerow(value)

    with open('duplicates.csv', 'w', newline='') as outfile:
        spamwriter = csv.writer(outfile, delimiter=',',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)

        for key, value in dupes.items():
            spamwriter.writerow(value)
