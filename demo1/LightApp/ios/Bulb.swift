//
//  Bulb.swift
//  LightApp
//
//  Created by conor vanoystaeyen on 24/11/2020.
//

import Foundation
import AVFoundation

@objc(Bulb)

class Bulb: NSObject {
  @objc static var isOn = false

  @objc func turnOn() {
    Bulb.isOn = true
    toggleTorch(on: true)
    print("Bulb is now ON")
  }
  
  @objc func turnOff() {
    Bulb.isOn = false
    toggleTorch(on: false)
    print("Bulb is now OFF")
  }
  
  func toggleTorch(on: Bool) {
    guard let device = AVCaptureDevice.default(for: AVMediaType.video)
      else {return}
    
    if device.hasTorch {
      do {
        try device.lockForConfiguration()
        
        if (on == true) {
          device.torchMode = .on
        } else {
          device.torchMode = .off
        }
        
        device.unlockForConfiguration()
        
      } catch {
        print("Torch could not be used")
      }
    } else {
      print("Torch could not be used")
    }
  }
  
  @objc
  func getStatus(_ callback: RCTResponseSenderBlock) {
    callback([NSNull(), Bulb.isOn])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
