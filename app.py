def Depth(N, A):

    # this is default OUTPUT. You can change it.
    result = -404

    # write your Logic here:

    return result


# INPUT [uncomment & modify if required]
N = int(input("Enter No"))

A = [[0 for j in range(2)]for i in range(N-1)]

temp = []
for i in range(N-1):
    temp = raw_input().split()
    for j in xrange(2):
        A[i][j] = int(temp[j])

# OUTPUT [uncomment & modify if required]
print Depth(N, A)
