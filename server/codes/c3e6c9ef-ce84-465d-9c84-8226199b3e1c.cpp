#include <iostream>
#include <stdio.h>
using namespace std;
int main() {
  int n; cin>>n;
	int ar[n+3];
	for(int i=0; i<n; i++) cin>>ar[i];
	for(int i=0; i<n; i++) cout<<ar[i]<<" "
	cout<<endl;
  return 0;
}
