import sys
import re


def main():
    if sys.argv.__len__() != 2:
        print 'Incorrect number of arguments'
        exit(1)
    arg = sys.argv[1]
    str = open(arg, 'r').read()
    str = str.strip(' \n\r')
    m = re.split('-----\n', str)
    newstr = m[m.__len__()-1]
    newstr = newstr.strip('- \n\r')
    print newstr

if __name__ == "__main__":
    main()