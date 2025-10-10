import React, { useState, useEffect } from 'react';
export function RepairService() {
  const { user, accessToken } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    deviceType: '',
    issue: '',
    description: '',
    contactInfo: '',
  });

  useEffect(() => {
    if (user) {
      loadInquiries();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/repairs', {}, accessToken || undefined);
      setInquiries(data || []);
    } catch (error) {
      console.error('Failed to load repair inquiries:', error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be signed in to submit a repair inquiry');
      return;
    }

    try {
      await apiRequest('/repairs', {
        method: 'POST',
        body: JSON.stringify(formData),
      }, accessToken || undefined);

      toast.success('Repair inquiry submitted successfully!');
      setFormData({
        deviceType: '',
        issue: '',
        description: '',
        contactInfo: '',
      });
      setShowDialog(false);
      await loadInquiries();
    } catch (error) {
      console.error('Failed to submit repair inquiry:', error);
      toast.error(error.message || 'Failed to submit inquiry');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed'="h-5 w-5 text-green-600" />;
      case 'in-progress'="h-5 w-5 text-blue-600" />;
      default="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'in-progress':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        
          <h1 className="text-3xl mb-2">Repair Service</h1>
          <p className="text-gray-600">Get your gadgets fixed by professionals</p>
        </div>
        {user && (
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Inquiry
          </Button>
        )}
      </div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        
          <h2 className="text-2xl mb-4">Professional Gadget Repair</h2>
          <p className="text-gray-700 mb-6">
            Our certified technicians can fix a wide range of gadget issues. From screen replacements 
            to battery changes, water damage to software problems - we've got you covered.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              Fast Turnaround</div>
                <p className="text-sm text-gray-600">Most repairs completed within 24-48 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              Quality Parts</div>
                <p className="text-sm text-gray-600">We use genuine and high-quality replacement parts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              Warranty Included</div>
                <p className="text-sm text-gray-600">All repairs come with a 90-day warranty</p>
              </div>
            </div>
          </div>
        </div>
        
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1670645948769-aee9ff92d59f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBhaXIlMjBzZXJ2aWNlJTIwdG9vbHN8ZW58MXx8fHwxNzU5NDg0MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Repair service"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* User's Inquiries */}
      {user && (
        <>
          <h2 className="text-2xl mb-6">Your Repair Inquiries</h2>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-600">Loading inquiries...</div>
            </div>
          ) : inquiries.length === 0 ? (
            <Card className="mb-8">
              <CardContent className="p-12 text-center">
                <Wrench className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No repair inquiries yet</p>
                <Button onClick={() => setShowDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your First Inquiry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {inquiries.map(inquiry => (
                <Card key={inquiry.id}>
                  
                    <div className="flex items-start justify-between">
                      
                        <CardTitle className="text-lg mb-1">{inquiry.deviceType}</CardTitle>
                        {inquiry.issue}</CardDescription>
                      </div>
                      {getStatusIcon(inquiry.status)}
                    </div>
                  </CardHeader>
                  
                    <p className="text-sm text-gray-700 mb-4">{inquiry.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Services Offered */}
      <h2 className="text-2xl mb-6">Services We Offer</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
            <CardTitle className="text-lg">Screen Repair</CardTitle>
          </CardHeader>
          
            <p className="text-sm text-gray-600">Cracked or damaged screens repaired with quality displays</p>
          </CardContent>
        </Card>
        
            <CardTitle className="text-lg">Battery Replacement</CardTitle>
          </CardHeader>
          
            <p className="text-sm text-gray-600">Replace old batteries to restore full device performance</p>
          </CardContent>
        </Card>
        
            <CardTitle className="text-lg">Water Damage</CardTitle>
          </CardHeader>
          
            <p className="text-sm text-gray-600">Professional cleaning and restoration services</p>
          </CardContent>
        </Card>
        
            <CardTitle className="text-lg">Software Issues</CardTitle>
          </CardHeader>
          
            <p className="text-sm text-gray-600">Fix crashes, update problems, and performance issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Inquiry Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          Submit Repair Inquiry</DialogTitle>
            
              Tell us about your device issue and we'll get back to you with a quote
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="deviceType">Device Type</Label>
                <Select 
                  value={formData.deviceType} 
                  onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
                >
                  
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  
                    <SelectItem value="Smartphone">Smartphone</SelectItem>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Smartwatch">Smartwatch</SelectItem>
                    <SelectItem value="Gaming Console">Gaming Console</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue">Issue Type</Label>
                <Select 
                  value={formData.issue} 
                  onValueChange={(value) => setFormData({ ...formData, issue: value })}
                >
                  
                    <SelectValue placeholder="Select issue" />
                  </SelectTrigger>
                  
                    <SelectItem value="Screen Damage">Screen Damage</SelectItem>
                    <SelectItem value="Battery Issue">Battery Issue</SelectItem>
                    <SelectItem value="Water Damage">Water Damage</SelectItem>
                    <SelectItem value="Software Problem">Software Problem</SelectItem>
                    <SelectItem value="Charging Issue">Charging Issue</SelectItem>
                    <SelectItem value="Physical Damage">Physical Damage</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="Phone number or email"
                  required
                />
              </div>
            </div>

              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Inquiry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
