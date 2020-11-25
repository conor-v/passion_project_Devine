//
//  Calc.m
//  CalcApp
//
//  Created by conor vanoystaeyen on 25/11/2020.
//

#import "Calc.h"

@implementation Calc

RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport {
  return(@{@"welcome":@"Dit is mijn tot de 2de app!"});
}

RCT_EXPORT_METHOD(squareMe:(int)number:(RCTResponseSenderBlock)callback) {
  callback(@[[NSNull null], [NSNumber numberWithInt:(number * number)]]);
}

@end
