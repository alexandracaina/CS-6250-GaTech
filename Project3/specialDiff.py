import sys
import re


def main():
    if sys.argv.__len__() != 3:
        print 'Incorrect number of arguments'
        exit(1)
    file1 = sys.argv[1]
    file2 = sys.argv[2]
    lines1 = open(file1).readlines()
    lines2 = open(file2).readlines()
    if(lines1.__len__() != lines2.__len__()):
        raise Exception('Files are of different size or formats')
    for line1,line2 in zip(lines1,lines2):
        line1 = line1.strip(' \n\r')
        line2 = line2.strip(' \n\r')
        firstSplit1 = line1.split(':')
        name1 = firstSplit1[0]
        data1 = firstSplit1[1].split(",")
        firstSplit2 = line2.split(':')
        name2 = firstSplit2[0]
        data2 = firstSplit2[1].split(",")
        if(name1 != name2):
            raise Exception('Nodes do not match! {0} != {1}'.format(name1, name2))
        data1 = sorted(data1)
        data2 = sorted(data2)
        if(cmp(data1, data2) != 0):
            raise Exception('Data does not match for node:{0}! {1} != {2}'.format(name1, data1, data2))
if __name__ == "__main__":
    main()