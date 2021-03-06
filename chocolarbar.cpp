#include<bits/stdc++.h>
using namespace std;
const int max1 = 40 , max2 = 60;
const long long INF = 123456789;
int n,m,k;
long long dp[max1][max1][max2];

int main(){
	for(int i = 0; i < max1; i ++){
		for(int j = 0; j < max1; j ++){
			for(int k = 0; k < max2; k ++){
				if(i*j == k || k == 0)
				dp[i][j][k] = 0;
				else dp[i][j][k] = INF;
				for(int l = 0; l <= k ;l ++){
					for(int m = 1; m < i ; m ++){
						dp[i][j][k] = min(dp[i][j][k], j*j + dp[m][j][l] + dp[i-m][j][k-l]);
					}
					for(int m = 1; m < j ; m ++){
						dp[i][j][k] = min(dp[i][j][k], i*i + dp[i][m][l] + dp[i][j-m][k-l]);
					}
				}
			}
		}
	}
	int t;
	cin>>t;
	while(t--){
		cin>>n>>m>>k;
		cout<<dp[n][m][k]<<"\n";
		
	}
	return 0;
}
