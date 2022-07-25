#include <iostream>
#include <stdio.h>
using namespace std;
int main() {
  int ar[10] = {321, 975, 392, 484, 383};
	for(int i=0; i<5; i++) {
		cout<<ar[i];
		if(i != 4) cout<<endl;
	} 
  return 0;
}
