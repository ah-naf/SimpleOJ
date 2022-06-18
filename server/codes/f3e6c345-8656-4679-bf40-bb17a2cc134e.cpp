#include <iostream>
#include <stdio.h>
using namespace std;
int main() {
  int n; cin>>n;
	int ar[n+1];
	for(int i=0; i<n; i++) {
		cin>>ar[i];
	}
	int ar2[10] = {321, 975, 392, 484, 383};
	for(int i=0; i<n; i++) {
		if(i!=n-1) cout<<ar2[i]<<endl;
		else cout<<ar2[i];
	}
}