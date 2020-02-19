import csv

with open('italian_curses.txt') as txt_file:
    txt_reader = csv.reader(txt_file, delimiter = '\t')
    list = []
    for row in txt_reader:
        list.append(row)

with open('curse_list.csv', 'w') as csv_file:
    csv_writer = csv.writer(csv_file, delimiter = '\t')
    line = 0
    for row in range(len(list)):
        if line == 0:
            csv_writer.writerow(['Italian', 'English'])
            line += 1
        else:
            csv_writer.writerow(list[row])
            line += 1
